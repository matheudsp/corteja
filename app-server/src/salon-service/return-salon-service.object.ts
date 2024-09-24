import { Prisma } from "@prisma/client";

export const returnSalonServiceObject: Prisma.SalonServiceSelect = {
    id:true,
    image:true,
    name:true,
    price:true,
    duration:true,
    recurrence:true,

    
}

export const returnServiceObjectFullest: Prisma.SalonServiceSelect = {
    ...returnSalonServiceObject
}