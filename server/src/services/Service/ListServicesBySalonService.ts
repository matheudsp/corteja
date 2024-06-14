import prismaClient from "../../prisma";

class ListServicesBySalonService{
    async execute(salonId: string) {
        const cliente = await prismaClient.salao.findMany({
            where:{
                id: salonId
            },
            select:{
                servicos: true
            }
        })

        return cliente;
    }
}

export {ListServicesBySalonService};