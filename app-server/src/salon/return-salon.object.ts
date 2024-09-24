import { Prisma } from "@prisma/client";

export const returnSalonObject: Prisma.SalonSelect = {
    image: true,
    id:true,
    name: true,
    createdAt: true,
    geoCoordinates:true,
    employee:false,
    address: true,
}

export const returnSalonObjectFullest: Prisma.SalonSelect = {
    ...returnSalonObject
}