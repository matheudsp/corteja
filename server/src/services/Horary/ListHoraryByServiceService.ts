import prismaClient from "../../prisma";

interface Request {
    servicosIds: [],
}

class ListHoraryByServiceService {
    async execute({
        servicosIds,

    }: Request) {

        const colaboradores = await prismaClient.colaborador_Servico.findMany({
            where: {
                servicoId: { in: servicosIds }
            },
            include: {
                colaborador: {
                    select: {
                        id: true,
                        nome: true
                    }
                }
            }
        });

        const uniqueColaboradoresMap = new Map();
        for (const colaboradorServico of colaboradores) {
            const { colaborador } = colaboradorServico;
            if (!uniqueColaboradoresMap.has(colaborador.id)) {
                uniqueColaboradoresMap.set(colaborador.id, {
                    label: colaborador.nome,
                    value: colaborador.id
                });
            }
        }
        const listaColaboradores = Array.from(uniqueColaboradoresMap.values());

        return ({colaboradores:listaColaboradores})

    }
}
export { ListHoraryByServiceService };