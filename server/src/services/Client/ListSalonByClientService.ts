import prismaClient from "../../prisma";
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

        if(!cliente){
            throw new Error('Erro ao procurar usuário.')
        }

        return cliente;
    }
}

export {ListSalonByClientService};