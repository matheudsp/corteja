import prismaClient from "../../prisma";

interface Request {
    horarioId: string,
    servicos: string[],
    colaboradores: string[],
    dias: number[],
    horarioInicio: string,
    horarioFim: string

}

class UpdateHoraryService {
    async execute({
        horarioId,
        servicos,
        colaboradores,
        dias,
        horarioInicio,
        horarioFim
    }: Request) {
        
        const horario = await prismaClient.horario.update({
            where:{
                id: horarioId
            },
            data: {
                dias: dias,
                horarioInicio: new Date(horarioInicio),
                horarioFim: new Date(horarioFim)
            }
        });

        // Delete existing servico relations for this horario
        await prismaClient.horarios_Servicos.deleteMany({
            where: {
                horarioId: horarioId
            }
        });
        
         // Create new servico relations for this horario
         const servicosRelations = servicos.map(servicoId => ({
            horarioId: horarioId,
            servicoId: servicoId
        }));


        await prismaClient.horarios_Servicos.createMany({
            data: servicosRelations
        });

        await prismaClient.horarios_Colaboradores.deleteMany({
            where: {
                horarioId: horarioId
            }
        });
        
        const colaboradoresRelations = colaboradores.map(colaboradorId => {
            return {
                horarioId: horarioId,
                colaboradorId: colaboradorId
            };
        });

        await prismaClient.horarios_Colaboradores.createMany({
            data: colaboradoresRelations
        });

        return horario;
    }
}

export { UpdateHoraryService };