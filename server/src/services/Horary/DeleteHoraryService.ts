import prismaClient from "../../prisma";

interface Request {
    horarioId: string
}

class DeleteHoraryService {
    async execute({
        horarioId
    }: Request) {
        // Cria o Horario
        const horario = await prismaClient.horario.delete({
            where:{
                id: horarioId
            },
            select: {
                id: true
            }
        });

        return horario;
    }
}

export { DeleteHoraryService };