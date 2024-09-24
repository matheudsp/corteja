import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { returnUserObject } from './return-user.object'

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getById(id: string, selectObject: Prisma.CustomerSelect = {}) {
        const user = await this.prisma.customer.findUnique({
            where:{
                id
            },
            select:{
                ...returnUserObject,
                ...selectObject
            }
        })

        if(!user) {
            throw new Error('Usuário não encontrado')
        }

        return user
    }

    async toggleFavorite(userId: string, salonId: string) {
        const user = await this.getById(userId)

        if(!user) throw new NotFoundException('Usuário não encontrado!')
        
        const isExists = user.favorites.some(
            salon => salon.id === salonId
        )

        await this.prisma.customer.update({
            where:{
                id: user.id
            },
            data:{
                favorites:{
                    [isExists ? 'disconnect' : 'connect']: {
                        id: salonId
                    }
                }
            }
        })

        return {message:'Success'}
    }
}
