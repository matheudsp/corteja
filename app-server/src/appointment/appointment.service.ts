import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { returnAppointmentObject } from './return-appointment.object';
import { AppointmentFilterDto } from './dto/appointment-filter.dto';
import dayjs from 'dayjs';
import { SLOT_DURATION, hourToMinutes, mergeDateTime, sliceMinutes, splitByValue } from "../utils/util";
import _ from 'lodash';
import { CreateAppoitmentDto } from './dto/appointment.dto';

@Injectable()
export class AppointmentService {
    constructor(
        private prisma: PrismaService
    ) { }

    async bySalon(salonId: string) {
        const appointment = await this.prisma.appointment.findMany({
            where: { salonId },
            select: returnAppointmentObject
        })

        if (!appointment) throw new Error('Agendamentos não foram encontrados')
        return appointment
    }

    async filter(dto: AppointmentFilterDto) {
        const { date, salonId } = dto

        const appointment = await this.prisma.appointment.findMany({
            where: {
                salonId,
                date: {
                    gte: dayjs(date.start).startOf('day').toISOString(),
                    lte: dayjs(date.end).endOf('day').toISOString()
                }
            },
            include: {
                salonService: {
                    select: {
                        id: true,
                        name: true,
                        duration: true,
                    }
                },
                employee: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                customer: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        return appointment;
    }

    async create(dto: CreateAppoitmentDto) {
        const {
            couponId,
            customerId, 
            date,
            employeeId,
            salonId,
            serviceId
        } = dto

        const appointment = await this.prisma.appointment.create({
            data:{
                couponId,
                customerId,
                employeeId,
                serviceId,
                salonId,
                date: new Date(date)
            }
        })

        return appointment.id
    }

    async update() { }

    async delete(id:string) { 
        return await this.prisma.appointment.delete({
            where:{id}
        })
    }

    async verify(salonId: string, data: string, salonServiceId: string) {
        const salonService = await this.prisma.salonService.findFirst({
            where: {
                id: salonServiceId
            },
            select: {
                duration: true
            }
        })

        if (!salonService || !salonService.duration) {
            throw new Error(`O serviço com ID ${salonServiceId} não foi encontrado ou não possui duração definida`)
        }

        const durationString = `${Math.floor(salonService.duration / 60).toString().padStart(2, '0')}:${(salonService.duration % 60).toString().padEnd(2, '0')}`;
        const salonServiceDuration = hourToMinutes(durationString);
        const salonServiceDurationSlots = sliceMinutes(dayjs(salonService.duration).toDate(), dayjs(salonService.duration).add(salonServiceDuration, 'minutes').toDate(), SLOT_DURATION, false).length;

        let schedule: { [key: string]: any }[] = [];
        let lastDay = dayjs(data);

        for (let i = 0; i <= 365 && schedule.length <= 7; i++) {
            const servicesRendered = await this.prisma.serviceRendered.findMany({
                where: {
                    salonId,
                    days: {
                        has: dayjs(lastDay).day()
                    },
                    services: {
                        some: {
                            salonServiceId
                        }
                    }
                },
                include: {
                    employees: {
                        select: {
                            employeeId: true
                        }
                    }
                }
            });

            if (servicesRendered.length > 0) {
                let allScheduleDay: { [key: string]: string[] } = {};

                for (let schedule of servicesRendered) {
                    for (let employee of schedule.employees) {
                        if (!allScheduleDay[employee.employeeId]) {
                            allScheduleDay[employee.employeeId] = [];
                        }

                        allScheduleDay[employee.employeeId] = [
                            ...allScheduleDay[employee.employeeId],
                            ...sliceMinutes(
                                mergeDateTime(lastDay, schedule.hourStart),
                                mergeDateTime(lastDay, schedule.hourEnd),
                                SLOT_DURATION
                            )
                        ];
                    }
                }

                for (let employeeKey of Object.keys(allScheduleDay)) {
                    const appointments = await this.prisma.appointment.findMany({
                        where: {
                            employeeId: employeeKey,
                            date: {
                                gte: dayjs(lastDay).startOf('day').toISOString(),
                                lte: dayjs(lastDay).endOf('day').toISOString()
                            }
                        },
                        select: {
                            date: true
                        }
                    });

                    let busySchedules = appointments.flatMap(a => {
                        const start = dayjs(a.date);
                        const end = start.add(salonServiceDuration, 'minutes');
                        return sliceMinutes(start, end, SLOT_DURATION, false);
                    });

                    let freeSchedules = splitByValue(
                        _.uniq(allScheduleDay[employeeKey]),
                        '-'
                    );

                    freeSchedules = freeSchedules
                        .filter(slot => slot.length >= salonServiceDurationSlots)
                        .map(slot => slot.filter((_, index) => slot.length - index >= salonServiceDurationSlots));

                    freeSchedules = _.chunk(freeSchedules.flat(), 2);

                    if (freeSchedules.length === 0) {
                        delete allScheduleDay[employeeKey];
                    } else {
                        allScheduleDay[employeeKey] = freeSchedules.flat()
                    }

                    const totalEmployees = Object.keys(allScheduleDay).length;

                    if (totalEmployees > 0) {
                        const employees = await this.prisma.employee.findMany({
                            where: {
                                id: { in: _.uniq(Object.keys(allScheduleDay)) }
                            },
                            select: {
                                name: true,
                                avatarPath: true
                            }
                        });

                        const formattedEmployees = employees.map(e => ({
                            name: e.name.split('')[0],
                            avatar: e.avatarPath
                        }));

                        schedule.push({
                            [dayjs(lastDay).format('YYYY-MM-DD')]: {
                                employees: formattedEmployees,
                                servicesRendered: allScheduleDay
                            }
                        });
                    }


                }

            }
            lastDay = dayjs(lastDay).add(1, 'day');
        }
        return schedule
    }
}
