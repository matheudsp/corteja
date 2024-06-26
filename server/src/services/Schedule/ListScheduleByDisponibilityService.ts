
import prismaClient from "../../prisma";
import dayjs from 'dayjs';
import _ from 'lodash';

import { SLOT_DURATION, hourToMinutes, mergeDateTime, sliceMinutes, splitByValue } from "../../utils/util";

interface Request {
    data: string;
    salaoId: string;
    servicoId: string;
}

interface Colaborador {
    foto: string;
    nome: string;
}

class ListScheduleByDisponibilityService {
    async execute({
        data,
        salaoId,
        servicoId,
    }: Request) {
        const servico = await prismaClient.servico.findFirst({
            where: {
                id: servicoId
            },
            select: {
                duracao: true
            }
        });

        if (!servico || !servico.duracao) {
            throw new Error(`Serviço com ID ${servicoId} não encontrado ou sem duração definida.`);
        }

        const duracaoString = `${Math.floor(servico.duracao / 60).toString().padStart(2, '0')}:${(servico.duracao % 60).toString().padStart(2, '0')}`;
        const servicoDuracao = hourToMinutes(duracaoString);
        const servicoDuracaoSlots = sliceMinutes(dayjs(servico.duracao).toDate(), dayjs(servico.duracao).add(servicoDuracao, 'minutes').toDate(), SLOT_DURATION, false).length;

        let agenda: { [key: string]: any }[] = [];
        let lastDay = dayjs(data);

        for (let i = 0; i <= 365 && agenda.length <= 7; i++) {
            const horarios = await prismaClient.horario.findMany({
                where: {
                    salaoId,
                    dias: {
                        has: dayjs(lastDay).day()
                    },
                    servicos: {
                        some: {
                            servicoId
                        }
                    }
                },
                include: {
                    colaboradores: {
                        select: {
                            colaboradorId: true
                        }
                    }
                }
            });

            if (horarios.length > 0) {
                let todosHorariosDia: { [key: string]: string[] } = {};

                for (let horario of horarios) {
                    for (let colaborador of horario.colaboradores) {
                        if (!todosHorariosDia[colaborador.colaboradorId]) {
                            todosHorariosDia[colaborador.colaboradorId] = [];
                        }

                        todosHorariosDia[colaborador.colaboradorId] = [
                            ...todosHorariosDia[colaborador.colaboradorId],
                            ...sliceMinutes(
                                mergeDateTime(lastDay, horario.horarioInicio),
                                mergeDateTime(lastDay, horario.horarioFim),
                                SLOT_DURATION
                            )
                        ];
                    }
                }

                for (let colaboradorKey of Object.keys(todosHorariosDia)) {
                    const agendamentos = await prismaClient.agendamento.findMany({
                        where: {
                            colaboradorId: colaboradorKey,
                            data: {
                                gte: dayjs(lastDay).startOf('day').toISOString(),
                                lte: dayjs(lastDay).endOf('day').toISOString()
                            }
                        },
                        select: {
                            data: true
                        }
                    });

                    let horariosOcupado = agendamentos.flatMap(a => {
                        const inicio = dayjs(a.data);
                        const fim = inicio.add(servicoDuracao, 'minutes');
                        return sliceMinutes(inicio, fim, SLOT_DURATION, false);
                    });

                    let horariosLivres = splitByValue(
                        _.uniq(todosHorariosDia[colaboradorKey]),
                        '-'
                    );

                    horariosLivres = horariosLivres
                        .filter(slot => slot.length >= servicoDuracaoSlots)
                        .map(slot => slot.filter((_, index) => slot.length - index >= servicoDuracaoSlots));

                    horariosLivres = _.chunk(horariosLivres.flat(), 2);

                    if (horariosLivres.length === 0) {
                        delete todosHorariosDia[colaboradorKey];
                    } else {
                        todosHorariosDia[colaboradorKey] = horariosLivres.flat();
                    }

                    const totalColaboradores = Object.keys(todosHorariosDia).length;

                    if (totalColaboradores > 0) {
                        const colaboradores = await prismaClient.colaborador.findMany({
                            where: {
                                id: { in: _.uniq(Object.keys(todosHorariosDia)) }
                            },
                            select: {
                                nome: true,
                                foto: true
                            }
                        });

                        const formattedColaboradores = colaboradores.map(c => ({
                            nome: c.nome.split(' ')[0],
                            foto: c.foto
                        }));

                        agenda.push({
                            [dayjs(lastDay).format('YYYY-MM-DD')]: {
                                colaboradores: formattedColaboradores,
                                horarios: todosHorariosDia
                            }
                        });
                    }
                }
            }

            lastDay = dayjs(lastDay).add(1, 'day');
        }

        return agenda;
    }
}

export { ListScheduleByDisponibilityService };