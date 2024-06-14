import prismaClient from "../../prisma";

interface Request {
    salonId: string,
}

class ListCouponBySalonService{
    async execute({
        salonId
    }: Request) {
        const service = await prismaClient.cupom.findMany({
            where:{
                salaoId: salonId
            }
        })

        return service;
    }
}

export {ListCouponBySalonService};