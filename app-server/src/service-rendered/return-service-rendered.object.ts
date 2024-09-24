import { Prisma } from "@prisma/client";

export const returnServiceRenderedObject: Prisma.ServiceRenderedSelect = {
    id:true,
    days:true,
    hourEnd:true,
    hourStart:true,
}

export const returnServiceRenderedObjectFullest: Prisma.ServiceRenderedSelect = {
    ...returnServiceRenderedObject
}