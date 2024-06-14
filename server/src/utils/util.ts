import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);


export const SLOT_DURATION = 30; // MINUTOS

interface Horario {
  dias: number[];
  horarioInicio: Date;
  horarioFim: Date;
}
export const isOpened = async (horarios: Horario[]): Promise<boolean> => {
  // VERIFICANDO SE EXISTE REGISTRO NAQUELE DIA DA SEMANA
  const horariosDia = horarios.filter((h) => h.dias.includes(dayjs().day()));
  if (horariosDia.length > 0) {
    // VERIFICANDO HORARIOS
    for (let h of horariosDia) {
      const inicio = dayjs(h.horarioInicio, 'HH:mm');
      const fim = dayjs(h.horarioFim, 'HH:mm');
      if (dayjs().isBetween(inicio, fim)) {
        return true;
      }
    }
    return false;
  }
  return false;
};

export const toCents = (price: number): number => {
  return parseInt(price.toString().replace('.', '').replace(',', ''));
};

export const mergeDateTime = (date: string | Date, time: string): string => {
  const merged = `${dayjs(date).format('YYYY-MM-DD')}T${dayjs(time).format('HH:mm')}`;
  return merged;
};

export const sliceMinutes = (
  start: string | Date,
  end: string | Date,
  duration: number,
  validation = true
): string[] => {
  let slices: string[] = [];
  let count = 0;

  const now = dayjs();
  let startTime = dayjs(start);
  let endTime = dayjs(end);

  while (endTime.isAfter(startTime)) {
    if (startTime.format('YYYY-MM-DD') === now.format('YYYY-MM-DD') && validation) {
      if (startTime.isAfter(now)) {
        slices.push(startTime.format('HH:mm'));
      }
    } else {
      slices.push(startTime.format('HH:mm'));
    }

    startTime = startTime.add(duration, 'minute');
    count++;
  }
  return slices;
};

export const hourToMinutes = (hourMinute: string): number => {
  const [hour, minutes] = hourMinute.split(':');
  return parseInt(hour) * 60 + parseInt(minutes);
};

export const splitByValue = <T>(array: T[], value: T): T[][] => {
  let newArray: T[][] = [[]];
  array.forEach((item) => {
    if (item !== value) {
      newArray[newArray.length - 1].push(item);
    } else {
      newArray.push([]);
    }
  });
  return newArray;
};

