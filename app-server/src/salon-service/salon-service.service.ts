import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { returnSalonServiceObject } from './return-salon-service.object';
import { CreateSalonServiceDto, UpdateSalonServiceDto } from './dto/salon-service.dto';

@Injectable()
export class SalonServiceService {
    constructor (
        private prisma: PrismaService
    ) {}

    async bySalon(id: string){
        const services = await this.prisma.salonService.findMany({
            where:{id, status:'Enabled'},
            select: returnSalonServiceObject
        })

        if(!services) throw new NotFoundException('Serviços não foram encontrados')
        return services
    }

    async create(dto: CreateSalonServiceDto){
        const {salonId, duration,image,name,price,recurrence} = dto

        const alreadyExists = await this.prisma.salonService.findFirst({
            where:{
                salonId:salonId,
                name: name
            }
        })

        if(alreadyExists){
            throw new Error("Serviço existente.")
        }

        const service = await this.prisma.salonService.create({
            data:{
                salonId,
                duration,
                name,
                price,
                image,
                recurrence
            }
        })

        return service.id
    }

    async update(id:string, dto: UpdateSalonServiceDto){
        const {status,duration,image,name,price,recurrence} = dto

        return this.prisma.salonService.update({
            where:{id},
            data:{
                duration,
                status,
                image,
                name,
                price,
                recurrence
            }
        })
    }

    async delete(id: string){
        return this.prisma.salonService.delete({where:{id}})
    }
}
