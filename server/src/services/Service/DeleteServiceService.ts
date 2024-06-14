import prismaClient from "../../prisma";

interface Request {
    serviceId: string,
}

class DeleteServiceService{
    async execute({
        serviceId
    }: Request) {
        const service = await prismaClient.servico.delete({
            where:{
                id: serviceId
            },
            select:{
                id: true
            }
        })

        return service;
    }
}

export {DeleteServiceService};