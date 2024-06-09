import prismaClient from "../prisma";


interface Request {
    salaoId: string;
    foto: string
    nome: string;
    telefone: string;
    email: string;
    descricao: string;
    servicos: string[]
}


class CreateCollaboratorService {
    async execute({ nome, telefone, email, salaoId, foto, descricao, servicos}: Request){
        
        // valida email
        if(!email) {
            throw new Error("E-mail incorreto.")
        }

        // valida se já existe conta
        const ColaboradorExistente = await prismaClient.colaborador.findFirst({
            where:{
                email: email
            }
        })

        if (ColaboradorExistente) {
            throw new Error("Usuário existente.")
        }

        // medidas de protecao para senha

        

        const collaborator = await prismaClient.colaborador.create({
            data: {
                salaoId: salaoId,
                descricao: descricao,
                foto: foto,
                nome: nome,
                email: email, 
                telefone: telefone,
                servicos: {
                    create: servicos.map(servicoId => ({
                        servico: {
                            connect: { id: servicoId }
                        }
                    }))
                }
            },
            select: {
                id: true,
            }
        })


        return collaborator
        
    }
}

export {CreateCollaboratorService}