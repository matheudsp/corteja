import prismaClient from "../../prisma";
import dayjs from 'dayjs'
import { SLOT_DURATION, hourToMinutes, mergeDateTime, sliceMinutes, splitByValue } from "../../utils/util";
import _ from 'lodash';

interface Request {
    data: string,
    salaoId: string,
    servicoId: string,
}

class ListScheduleByDisponibilityService {
    async execute({
        data,
        salaoId,
        servicoId,

    }: Request) {
        const horarios = await prismaClient.horario.findMany({
            where: {
                salaoId: salaoId
            },
            include: {
                servicos: {
                    select: {
                        servicoId: true
                    }
                },
                colaboradores: {
                    select: {
                        colaboradorId: true
                    }
                }
            }
        })
        const servico = await prismaClient.servico.findFirst({
            where: {
                id: servicoId
            },
            select: {
                duracao: true
            }
        })
        let colaboradores = []
        let agenda = []
        let lastDay = dayjs(data)

        //duracao do servico
        const servicoDuracao = hourToMinutes(
            dayjs(servico.duracao).format('HH:mm')
        );

        const servicoDuracaoSlots = sliceMinutes(
            dayjs(servico.duracao).toDate(),
            dayjs(servico.duracao).add(servicoDuracao, 'minutes').toDate(),
            SLOT_DURATION,
            false
        ).length

        for (let i = 0; i <= 365 && agenda.length <= 7; i++) {
            const espacosValidos = horarios.filter((h) => {
                // VERIFICAR DIA DA SEMANA
                const diaSemanaDisponivel = h.dias.includes(dayjs(lastDay).day());

                // VERIFICAR ESPECIALIDADE DISPONÍVEL
                const servicosDisponiveis = horarios.some(h => h.servicos.map(s => s.servicoId).includes(servicoId));

                return diaSemanaDisponivel && servicosDisponiveis;
            });

            if (espacosValidos.length > 0) {
                // TODOS OS HORÁRIOS DISPONÍVEIS DAQUELE DIA
                let todosHorariosDia: { [key: string]: string[] } = {};
                for (let espaco of espacosValidos) {
                    for (let colaborador of espaco.colaboradores) {
                        if (!todosHorariosDia[colaborador.colaboradorId]) {
                            todosHorariosDia[colaborador.colaboradorId] = [];
                        }
                        todosHorariosDia[colaborador.colaboradorId] = [
                            ...todosHorariosDia[colaborador.colaboradorId],
                            ...sliceMinutes(
                                mergeDateTime(lastDay, espaco.horarioInicio),
                                mergeDateTime(lastDay, espaco.horarioFim),
                                SLOT_DURATION
                            ),
                        ];
                    }
                }
                // SE TODOS OS ESPECIALISTAS DISPONÍVEIS ESTIVEREM OCUPADOS NO HORÁRIO, REMOVER
                for (let colaboradorKey of Object.keys(todosHorariosDia)) {
                    // LER AGENDAMENTOS DAQUELE ESPECIALISTA NAQUELE DIA
                    const agendamentos = await prismaClient.agendamento.findMany({
                        where: {
                            colaboradorId: colaboradorKey,
                            data: {
                                gte: new Date(dayjs(lastDay).startOf('day').toISOString()), // Filtra a partir do início do dia
                                lte: new Date(dayjs(lastDay).endOf('day').toISOString()),   // Filtra até o final do dia
                            },
                        }, select: {
                            data: true
                        }
                    });

                    // RECUPERANDO HORÁRIOS OCUPADOS
                    let horariosOcupado = agendamentos.map((a) => ({
                        inicio: dayjs(a.data),
                        fim: dayjs(a.data).add(servicoDuracao, 'minutes'),
                    }));

                    horariosOcupado = horariosOcupado
                        .map((h) =>
                            sliceMinutes(h.inicio, h.fim, SLOT_DURATION, false)
                        )
                        .flat();

                    // REMOVENDO TODOS OS HORÁRIOS QUE ESTÃO OCUPADOS
                    let horariosLivres = splitByValue(
                        _.uniq(
                            todosHorariosDia[colaboradorKey].map((h) => {
                                return horariosOcupado.includes(h) ? '-' : h;
                            })
                        ),
                        '-'
                    );

                    // VERIFICANDO SE NOS HORÁRIOS CONTINUOS EXISTE SPAÇO SUFICIENTE NO SLOT
                    horariosLivres = horariosLivres
                        .filter((h) => h.length >= servicoDuracaoSlots)
                        .flat();

                    /* VERIFICANDO OS HORÁRIOS DENTRO DO SLOT 
                    QUE TENHAM A CONTINUIDADE NECESSÁRIA DO SERVIÇO
                    */
                    horariosLivres = horariosLivres.map((slot) =>
                        slot.filter(
                            (horario, index) => slot.length - index >= servicoDuracaoSlots
                        )
                    );

                    // SEPARANDO 2 EM 2
                    horariosLivres = _.chunk(horariosLivres, 2);

                    if (horariosLivres.length === 0) {
                        todosHorariosDia = _.omit(todosHorariosDia, colaboradorKey);
                    } else {
                        todosHorariosDia[colaboradorKey] = horariosLivres;
                    }

                    // VERIFICANDO SE TEM ESPECIALISTA COMA AGENDA NAQUELE DIA
                    const totalColaboradores = Object.keys(todosHorariosDia).length;

                    if (totalColaboradores > 0) {
                        colaboradores.push(Object.keys(todosHorariosDia));
                        console.log(todosHorariosDia);
                        agenda.push({
                            [dayjs(lastDay).format('YYYY-MM-DD')]: todosHorariosDia,
                        });
                    }
                }
                lastDay = dayjs(lastDay).add(1, 'day');
            }

            colaboradores = await prismaClient.colaborador.findFirst({
                where: {
                    id: { in: _.uniq(colaboradores.flat()) }
                },
                select: {
                    nome: true,
                    foto: true
                }
            });
            
            colaboradores = colaboradores.map((c) => ({
                ...c._doc,
                nome: c.nome.split(' ')[0],
            }));

            return {colaboradores, agenda}
        }
    }
}

export { ListScheduleByDisponibilityService };