import dayjs from "dayjs";
import prismaClient from "../../prisma";

type Periodo ={
    inicio: string,
    final: string
}

interface Request {
    salaoId: string,
    periodo: Periodo
}

class FilterScheduleService {
    async execute({
        salaoId,
        periodo
    }: Request) {
        const service = await prismaClient.agendamento.findMany({
            where: {
                salaoId: salaoId,
                data: {
                    gte: dayjs(periodo.inicio).startOf('day').toISOString(),
                    lte: dayjs(periodo.final).endOf('day').toISOString()
                }
            },
            include: {
                servico: {
                    select: {
                        id:true,
                        titulo: true,
                        duracao: true
                    }
                },
                colaborador: {
                    select: {
                        id:true,
                        nome: true
                    }
                },
                cliente: {
                    select: {
                        id:true,
                        nome: true
                    }
                }
            }
        });

        return service;
    }

}

export { FilterScheduleService };