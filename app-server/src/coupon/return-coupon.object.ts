import { Prisma } from "@prisma/client";

export const returnCouponObject: Prisma.CouponSelect = {
    id:true,
    code:true,
    dateStart:true,
    dateEnd:true,
    price:true,
    quantityUse:true,
    remainingUses:true,
    
}

export const returnCouponObjectFullest: Prisma.CouponSelect = {
    ...returnCouponObject
}