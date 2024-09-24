import { faker } from '@faker-js/faker';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateEmployeeDto, CreateEmployeeDto } from './dto/employee.dto';
import { returnEmployeeObject } from './return-employee.object';

@Injectable()
export class EmployeeService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async create(dto: CreateEmployeeDto) {
        const { services,salonId } = dto
        const employee = await this.prisma.employee.create({
            data: {
                salonId: salonId,
                name: faker.person.fullName(),
                avatarPath: faker.image.avatar(),
                services: {
                    create: services.map(serviceId => ({
                        salonService: {
                            connect: { id: serviceId }
                        }
                    }))
                }
            },
        })
        return employee.id
    }

    async bySalon(salonId: string) {
        const employeers = await this.prisma.employee.findMany({
            where: {
                salonId
            },
            select: returnEmployeeObject
        })

        if (!employeers) throw new NotFoundException('Colaboradores não foram encontrados')
        return employeers
    }

    async update(id: string, dto: UpdateEmployeeDto) {
        const { services, name, avatarPath, status } = dto

        return this.prisma.employee.update({
            where: {
                id
            },
            data: {
                avatarPath,
                name,
                status,
                services: {
                    set: services.map(serviceId => ({
                        employeeId_salonServiceId: {
                            salonServiceId: serviceId,
                            employeeId: id
                        }
                    }))
                }
            }
        })
    }

    async delete(id: string) {
        return this.prisma.employee.delete({where: {id}})
    }

}
