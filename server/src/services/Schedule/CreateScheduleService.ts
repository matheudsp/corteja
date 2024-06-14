import prismaClient from "../../prisma";

interface Request {
    data: string,
    cupomId: string,
    salaoId: string,
    servicoId: string,
    colaboradorId: string,
    clienteId: string
}

class CreateScheduleService {
    async execute({
        data,
        cupomId,
        salaoId,
        servicoId,
        colaboradorId,
        clienteId
    }: Request) {
        const service = await prismaClient.agendamento.create({
            data:{  
                data: new Date(data),
                cupomId: cupomId,
                salaoId: salaoId,
                servicoId: servicoId,
                colaboradorId: colaboradorId,
                clienteId: clienteId
            },
            select:{
                id: true
            }
        })
        return service
    }
}

export { CreateScheduleService };