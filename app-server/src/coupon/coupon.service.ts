import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { returnCouponObject } from './return-coupon.object';
import { UpdateCouponDto, CreateCouponDto } from './dto/coupon.dto';

@Injectable()
export class CouponService {
    constructor(
        private prisma: PrismaService
    ){}

    async bySalon(id: string){
        const coupons = await this.prisma.coupon.findMany({
            where: {id},
            select: returnCouponObject
        })

        if(!coupons) throw new NotFoundException('Cupons não foram encontrados') 
        return coupons
    }

    async create( dto:CreateCouponDto){
        const  {salonId, price, dateStart, dateEnd, code, quantityUse} = dto

        const alreadyExists = await this.prisma.coupon.findFirst({
            where:{
                code: code
            }
        })

        if(alreadyExists){
            throw new Error("Código de cupom existente")
        }

        const coupon = await this.prisma.coupon.create({
            data:{
                salonId,
                code,
                price,
                dateEnd,
                dateStart,
                quantityUse,
                remainingUses: quantityUse
            }
        })

        return coupon.id
    } 

    async update(id: string, dto:UpdateCouponDto){

        const  { price, dateStart, dateEnd, code,status, quantityUse} = dto

        const verify = await this.prisma.coupon.findUnique({
            where:{id: id},
            select:{
                quantityUse:true,
                remainingUses:true
            }
        })

        let remainingUsesUpdated = verify.remainingUses
        if(quantityUse !== undefined){
            const diff = quantityUse - verify.quantityUse
            remainingUsesUpdated += diff

            if(remainingUsesUpdated < 0){
                throw new Error("A quantidade de cupons não pode ser inferior a quantidade restante")
            }
        }

        return this.prisma.coupon.update({
            where:{id:id},
            data:{
                dateStart: dateStart ? new Date(dateStart) : undefined,
                dateEnd: dateEnd ? new Date(dateEnd) : undefined,
                price: price,
                code: code,
                status: status,
                quantityUse: quantityUse,
                remainingUses: remainingUsesUpdated
            }
        }) 
    }

    async delete(id:string){
        return this.prisma.coupon.delete({where:{id}})
    }

}
