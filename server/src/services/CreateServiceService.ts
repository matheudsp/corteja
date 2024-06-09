import prismaClient from "../prisma";

interface Request {
    salaoId: string
    titulo: string,
    preco: number,
    duracao: number,
    recorrencia: number,
    descricao: string ,
    foto: string
}

class CreateServiceService{
    async execute({salaoId,titulo, preco, duracao, recorrencia, descricao, foto }: Request) {
        const service = await prismaClient.servico.create({
            data:{  
                salaoId: salaoId,
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

export {CreateServiceService};