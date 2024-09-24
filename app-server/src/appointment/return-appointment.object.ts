import { Prisma } from "@prisma/client";

export const returnAppointmentObject: Prisma.AppointmentSelect = {
    id:true,
    customerId:true,
    employeeId:true,
    serviceId:true,
    couponId:true,
    date:true,
    
}

export const returnAppointmentObjectFullest: Prisma.AppointmentSelect = {
    ...returnAppointmentObject
}