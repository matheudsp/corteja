import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { returnServiceRenderedObject } from './return-service-rendered.object';
import { CreateServiceRenderedDto, UpdateServiceRenderedDto } from './dto/service-rendered.dto';

@Injectable()
export class ServiceRenderedService {
    constructor(
        private prisma: PrismaService
    ){}


    async bySalon(id:string){
        const serviceRendered = await this.prisma.serviceRendered.findMany({
            where:{id},
            select: returnServiceRenderedObject
        })

        if(!serviceRendered) throw new Error('Horários não foram encontrados')
        
        return serviceRendered
    }

    async create(dto: CreateServiceRenderedDto){
        

        const {salonId,days,employees,hourEnd,hourStart,salonServices} = dto

        const serviceRendered = await this.prisma.serviceRendered.create({
            data:{
                salonId: salonId,
                hourEnd: new Date(hourEnd),
                hourStart: new Date(hourStart),
                days,
            }
        });

        const salonServicesRelations = salonServices.map(salonServiceId => {
            return {
                serviceRenderedId: serviceRendered.id,
                salonServiceId: salonServiceId
            };  
        });

        await this.prisma.serviceRendered_SalonService.createMany({
            data:salonServicesRelations
        })

        const employeesRelations = employees.map(employeeId => {
            return{
                serviceRenderedId: serviceRendered.id,
                employeeId: employeeId
            }
        })

        await this.prisma.serviceRendered_Employees.createMany({
            data: employeesRelations
        })

        return serviceRendered
    }

    async byService(serviceId:[]){
        const employees = await this.prisma.employee_SalonService.findMany({
            where:{
                salonServiceId:{ in:serviceId },
            },
            include:{
                employee:{
                    select:{
                        id:true,
                        name:true,
                    }
                }
            }
        });

        const uniqueEmployeesMap = new Map();
        for (const employeeService of employees){
            const { employee } = employeeService;
            if(!uniqueEmployeesMap.has(employee.id)){
                uniqueEmployeesMap.set(employee.id, {
                    label: employee.name,
                    value: employee.id
                });
            }
        }
        const employeesList = Array.from(uniqueEmployeesMap.values());

        return ({employees: employeesList})
    }

    async update(id:string,dto: UpdateServiceRenderedDto){
        const {days,employees,hourEnd,hourStart,salonServices } = dto

        const serviceRendered = await this.prisma.serviceRendered.update({
            where:{id},
            data:{
                days,
                hourEnd: new Date(hourEnd),
                hourStart: new Date(hourStart)
            }
        })

        await this.prisma.serviceRendered_SalonService.deleteMany({
            where:{serviceRenderedId:id}
        })

        const salonServicesRelations  = salonServices.map(serviceId => ({
            serviceRenderedId: id,
            salonServiceId: serviceId
        }))

        await this.prisma.serviceRendered_SalonService.createMany({
            data: salonServicesRelations
        })

        await this.prisma.serviceRendered_Employees.deleteMany({
            where:{
                serviceRenderedId:id
            }
        })

        const employeesRelations = employees.map( employeeId => ({
            
                serviceRenderedId: id,
                employeeId: employeeId
            
        }))

        await this.prisma.serviceRendered_Employees.createMany({
            data: employeesRelations
        })

        return serviceRendered
    }

    async delete(id: string){
        await this.prisma.serviceRendered.delete({
            where:{id}
        })
    }
}

