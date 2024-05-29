import prismaClient from "../prisma";
//pesquisar salões onde cliente está inscrito
class ListSalonByClientService{
    async execute(clientId: string) {
        const cliente = await prismaClient.cliente.findMany({
            where:{
                id: clientId
            },
            select:{
                salaos: true
            }
        })

        return cliente;
    }
}

export {ListSalonByClientService};