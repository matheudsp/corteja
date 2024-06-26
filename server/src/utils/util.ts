// utils/util.ts

import dayjs from 'dayjs';

export const SLOT_DURATION = 45; // Duração do slot em minutos

/**
 * Combina uma data e hora em uma string no formato ISO 8601 (YYYY-MM-DDTHH:mm).
 * @param date Data (objeto Day.js ou string formatada)
 * @param time Hora (objeto Day.js ou string formatada)
 * @returns Data e hora combinadas em uma string ISO 8601
 */
export const mergeDateTime = (date: any, time: any): string => {
  const merged = `${dayjs(date).format('YYYY-MM-DD')}T${dayjs(time).format('HH:mm')}`;
  return merged;
};

/**
 * Divide um intervalo de tempo em slices de minutos com a duração especificada.
 * @param start Hora de início do intervalo
 * @param end Hora de término do intervalo
 * @param duration Duração de cada slice em minutos
 * @param validation Flag para validar o momento atual
 * @returns Array de strings representando os slices de minutos
 */
export const sliceMinutes = (
  start: any,
  end: any,
  duration: number,
  validation = true
): string[] => {
  let slices: string[] = [];
  let startTime = dayjs(start);
  let endTime = dayjs(end);

  while (endTime.isAfter(startTime)) {
    if (startTime.format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') && validation) {
      if (startTime.isAfter(dayjs())) {
        slices.push(startTime.format('HH:mm'));
      }
    } else {
      slices.push(startTime.format('HH:mm'));
    }

    startTime = startTime.add(duration, 'minute');
  }
  return slices;
};

/**
 * Converte uma hora no formato HH:mm em minutos totais.
 * @param hourMinute Hora no formato HH:mm
 * @returns Total de minutos
 */
export const hourToMinutes = (hourMinute: string): number => {
  const [hour, minutes] = hourMinute.split(':');
  return parseInt(hour) * 60 + parseInt(minutes);
};

/**
 * Divide um array em subarrays com base em um valor específico.
 * @param array Array a ser dividido
 * @param value Valor para dividir o array
 * @returns Array de subarrays divididos
 */
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
