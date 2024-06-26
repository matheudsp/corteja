import prismaClient from "../../prisma";

interface Request {
    salaoId: string,
}

class ListHoraryService {
    async execute({
        salaoId,
        
    }: Request) {
        
        const horario = await prismaClient.horario.findMany({
            where:{
                salaoId: salaoId
            },
            select:{
                id: true,
                dias:true,
                horarioFim:true,
                horarioInicio:true,
                criadoEm:true,
            }
        });

        return horario;
    }
}

export { ListHoraryService };