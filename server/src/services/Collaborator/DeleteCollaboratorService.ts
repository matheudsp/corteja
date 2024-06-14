import prismaClient from "../../prisma";

interface Request {
    colaboradorId: string;
}

class DeleteCollaboratorService {
    async execute({ colaboradorId }: Request) {

        const collaborator = await prismaClient.colaborador.delete({
            where: { 
                id: colaboradorId 
            },
            select: {
                id: true
            }
        });

        return collaborator;
    }
}

export { DeleteCollaboratorService };