import prismaClient from "../../prisma";

interface Request {
    salaoId: string,
    servicos: string[],
    colaboradores: string[],
    dias: number[],
    horarioInicio: string,
    horarioFim: string

}

class CreateHoraryService {
    async execute({
        salaoId,
        servicos,
        colaboradores,
        dias,
        horarioInicio,
        horarioFim
    }: Request) {
        // Cria o Horario
        const horario = await prismaClient.horario.create({
            data: {
                salaoId: salaoId,
                dias: dias,
                horarioInicio: new Date(horarioInicio),
                horarioFim: new Date(horarioFim)
            }
        });

        // Cria as relações com Servicos
        const servicosRelations = servicos.map(servicoId => {
            return {
                horarioId: horario.id,
                servicoId: servicoId
            };
        });

        await prismaClient.horarios_Servicos.createMany({
            data: servicosRelations
        });

        // Cria as relações com Colaboradores
        const colaboradoresRelations = colaboradores.map(colaboradorId => {
            return {
                horarioId: horario.id,
                colaboradorId: colaboradorId
            };
        });

        await prismaClient.horarios_Colaboradores.createMany({
            data: colaboradoresRelations
        });

        return horario;
    }
}

export { CreateHoraryService };