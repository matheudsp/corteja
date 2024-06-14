import prismaClient from "../../prisma";

interface Request {
    couponId: string,
}

class DeleteCouponService{
    async execute({
        couponId
    }: Request) {
        const service = await prismaClient.cupom.delete({
            where:{
                id: couponId
            },
            select:{
                id: true
            }
        })

        return service;
    }
}

export {DeleteCouponService};