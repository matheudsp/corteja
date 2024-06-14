import prismaClient from "../../prisma";


class ListAllClientsService {
    async execute(salonId: string) {
        const service = await prismaClient.cliente_Salao.findMany({
            where: {
                id: salonId
            },
            select: {
                cliente: true
            }

        })


        return service;
    }
}

export { ListAllClientsService };