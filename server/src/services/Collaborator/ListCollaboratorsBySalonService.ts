import prismaClient from "../../prisma";

interface Request {
    salaoId: string;
}

class ListCollaboratorsBySalonService {
    async execute({ salaoId }: Request) {

        const collaborator = await prismaClient.colaborador.findMany({
            where: { 
                AND:[
                    {salaoId: salaoId},
                    {status: "Ativo"}
                ]
            },
            select: {
                id:true,
                nome:true,
                status:true
            }
        });

        return collaborator;
    }
}

export { ListCollaboratorsBySalonService };