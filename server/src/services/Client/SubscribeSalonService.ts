import prismaClient from "../../prisma";

interface Request {
    clientId:string,
    salaoId: string
}

class SubscribeSalonService{
    async execute({clientId, salaoId}: Request) {
        const relacaoExistente = await prismaClient.cliente_Salao.findFirst({
            where: {
                clienteId: clientId
            }
        })

        if(relacaoExistente){
            throw Error('O salão já foi adicionado aos favoritos.')
        }

        const cliente = await prismaClient.cliente.findFirst({
            where:{
                id: clientId
            }
        })
        if (!cliente){
            throw new Error('Erro ao procurar usuário.')
        }

        const salao = await prismaClient.salao.findFirst({
            where:{
                id:salaoId
            }
        })
        if (!salao){
            throw new Error('Erro ao procurar salão.')
        }

        const clienteSalao = await prismaClient.cliente_Salao.create({
            data:{
                clienteId:clientId,
                salaoId:salaoId
            }
        })

        return clienteSalao
    }
}

export {SubscribeSalonService};