
type Agenda = {
  [date: string]: {
    [colaboradorId: string]: string[];
  };
}[];

type ColaboradoresDia = {
  [colaboradorId: string]: string[];
};

export default {
  diasSemana: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'] as string[],

  toAlpha: (hex: string, alpha: number): string => {
    const alphas: { [key: number]: string } = {
      100: 'FF',
      95: 'F2',
      90: 'E6',
      85: 'D9',
      80: 'CC',
      75: 'BF',
      70: 'B3',
      65: 'A6',
      60: '99',
      55: '8C',
      50: '80',
      45: '73',
      40: '66',
      35: '59',
      30: '4D',
      25: '40',
      20: '33',
      15: '26',
      10: '1A',
      5: '0D',
    };

    return hex + alphas[alpha];
  },

  selectAgendamento: (
    agenda: Agenda,
    data: string | null = null,
    colaboradorId: string | null = null
  ): {
    horariosDisponiveis: string[];
    data: string | null;
    colaboradorId: string | null;
    colaboradoresDia: ColaboradoresDia | null;
  } => {
    let horariosDisponiveis: string[] = [];
    let colaboradoresDia: ColaboradoresDia | null = null;

    if (agenda.length > 0) {
      data = data || Object.keys(agenda?.[0])?.[0];
      const dia = agenda.find((a) => Object.keys(a)[0] === data);
      const diaObject = dia?.[data];

      if (diaObject) {
        colaboradorId = colaboradorId || Object.keys(diaObject)?.[0];
        colaboradoresDia = diaObject;
        horariosDisponiveis = diaObject?.[colaboradorId] || [];
      }
    }

    return { horariosDisponiveis, data, colaboradorId, colaboradoresDia };
  },
};
