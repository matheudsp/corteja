import { Prisma } from "@prisma/client";

export const returnEmployeeObject: Prisma.EmployeeSelect = {
    id:true,
    name:true,
    avatarPath:true,
    createdAt:true,
    services:true
}

export const returnEmployeeObjectFullest: Prisma.EmployeeSelect = {
    ...returnEmployeeObject
}