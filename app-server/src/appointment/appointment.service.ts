import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { returnAppointmentObject } from './return-appointment.object';
import { AppointmentFilterDto } from './dto/appointment-filter.dto';
import dayjs from 'dayjs';
import { SLOT_DURATION, hourToMinutes, mergeDateTime, sliceMinutes, splitByValue } from "../utils/util";
import _ from 'lodash';
import { CreateAppoitmentDto } from './dto/appointment.dto';
import { AppointmentVerifyDto } from './dto/appointment-verify';
import moment from 'moment';

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
            data: {
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

    async delete(id: string) {
        return await this.prisma.appointment.delete({
            where: { id }
        })
    }
    async getDays(dto: AppointmentVerifyDto) {
       const {date, salonServiceId, salonId } = dto
        let schedule = [];
        let lastDay = dayjs(date);
        const servico = await this.prisma.salonService.findUnique({
            where: { id: salonServiceId },
            select: { duration: true }
        });

        // Verificação de erro no serviço
        if (!servico) {
            throw new Error('Serviço não encontrado.');
        }

        const servicoDuracao = servico.duration;
        const servicoDuracaoSlots = sliceMinutes(
            dayjs().startOf('day'),
            dayjs().startOf('day').add(servicoDuracao, 'minutes'),
            SLOT_DURATION,
            false
        ).length;

        for (let i = 0; i <= 365 && schedule.length <= 7; i++) {
            const horarios = await this.prisma.serviceRendered.findMany({
                where: {
                    salonId,
                    days: {
                        has: dayjs(lastDay).day()
                    },
                    services: {
                        some: {
                            salonServiceId: salonServiceId
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

            if (horarios.length > 0) {
                let todosHorariosDia: { [key: string]: string[] } = {};

                for (let horario of horarios) {
                    for (let colaborador of horario.employees) {
                        if (!todosHorariosDia[colaborador.employeeId]) {
                            todosHorariosDia[colaborador.employeeId] = [];
                        }

                        todosHorariosDia[colaborador.employeeId] = [
                            ...todosHorariosDia[colaborador.employeeId],
                            ...sliceMinutes(
                                mergeDateTime(lastDay, horario.hourStart),
                                mergeDateTime(lastDay, horario.hourEnd),
                                SLOT_DURATION
                            )
                        ];
                    }
                }

                for (let colaboradorKey of Object.keys(todosHorariosDia)) {
                    const agendamentos = await this.prisma.appointment.findMany({
                        where: {
                            employeeId: colaboradorKey,
                            date: {
                                gte: dayjs(lastDay).startOf('day').toISOString(),
                                lte: dayjs(lastDay).endOf('day').toISOString()
                            }
                        },
                        select: {
                            date: true
                        }
                    });

                    let horariosOcupado = agendamentos.flatMap(a => {
                        const inicio = dayjs(a.date);
                        const fim = inicio.add(servicoDuracao, 'minutes');
                        return sliceMinutes(inicio, fim, SLOT_DURATION, false);
                    });

                    let horariosLivres = splitByValue(
                        _.uniq(todosHorariosDia[colaboradorKey]),
                        '-'
                    );

                    horariosLivres = horariosLivres
                        .filter(slot => slot.length >= servicoDuracaoSlots)
                        .map(slot => slot.filter((_, index) => slot.length - index >= servicoDuracaoSlots));

                    horariosLivres = _.chunk(horariosLivres.flat(), 2);

                    if (horariosLivres.length === 0) {
                        delete todosHorariosDia[colaboradorKey];
                    } else {
                        todosHorariosDia[colaboradorKey] = horariosLivres.flat();
                    }
                }

                const totalColaboradores = Object.keys(todosHorariosDia).length;

                if (totalColaboradores > 0) {
                    const colaboradores = await this.prisma.employee.findMany({
                        where: {
                            id: { in: _.uniq(Object.keys(todosHorariosDia)) }
                        },
                        select: {
                            name: true,
                            avatarPath: true,
                            id:true
                        }
                    });

                    const formattedColaboradores = colaboradores.map(c => ({
                        id: c.id,
                        name: c.name.split(' ')[0],
                        avatarPath: c.avatarPath,
                        times: todosHorariosDia[c.id] || []  // Inclui os horários de cada colaborador
                    }));

                    schedule.push({
                        [dayjs(lastDay).format('YYYY-MM-DD')]: {
                            employees: formattedColaboradores
                        }
                    });
                }
            }

            lastDay = dayjs(lastDay).add(1, 'day');
        }

        return { schedule };
    }


}