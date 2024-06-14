import prismaClient from "../../prisma"

interface Request {
    serviceId: string
    titulo?: string,
    preco?: number,
    duracao?: number,
    recorrencia?: number,
    descricao?: string ,
    foto?: string
}

class UpdateServiceService{
    async execute({serviceId,titulo, preco, duracao, recorrencia, descricao, foto }: Request) {
        const service = await prismaClient.servico.update({
            where:{
                id: serviceId
            },
            data:{  
                titulo: titulo,
                recorrencia: recorrencia,
                descricao: descricao,
                duracao: duracao,
                preco: preco,
                foto: foto
                
            },
            select:{
                id: true
            }
        })

        return service;
    }
}

export {UpdateServiceService};