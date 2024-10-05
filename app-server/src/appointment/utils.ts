import { Injectable } from '@nestjs/common';
import moment from 'moment';

@Injectable()
export class UtilService {
  SLOT_DURATION = 30; // MINUTOS

  isOpened(horarios: any[]): boolean {
    const horariosDia = horarios.filter((h) => h.dias.includes(moment().day()));
    if (horariosDia.length > 0) {
      for (const h of horariosDia) {
        const inicio = moment(moment(h.inicio).format('HH:mm'), 'HH:mm:ss');
        const fim = moment(moment(h.fim).format('HH:mm'), 'HH:mm:ss');
        if (moment().isBetween(inicio, fim)) {
          return true;
        }
      }
      return false;
    }
    return false;
  }

  toCents(price: number): number {
    return parseInt(price.toString().replace('.', '').replace(',', ''), 10);
  }

  mergeDateTime(date: moment.Moment, time: moment.Moment): string {
    return `${moment(date).format('YYYY-MM-DD')}T${moment(time).format('HH:mm')}`;
  }

  sliceMinutes(start: moment.Moment, end: moment.Moment, duration: number, validation = true): string[] {
    const slices: string[] = [];
    const now = moment();
    start = moment(start);
    end = moment(end);

    while (end > start) {
      if (start.format('YYYY-MM-DD') === now.format('YYYY-MM-DD') && validation) {
        if (start.isAfter(now)) {
          slices.push(start.format('HH:mm'));
        }
      } else {
        slices.push(start.format('HH:mm'));
      }
      start = start.add(duration, 'minutes');
    }
    return slices;
  }

  hourToMinutes(hourMinute: string): number {
    const [hour, minutes] = hourMinute.split(':');
    return parseInt(hour, 10) * 60 + parseInt(minutes, 10);
  }

  splitByValue(array: any[], value: any): any[][] {
    const newArray: any[][] = [[]];
    array.forEach((item) => {
      if (item !== value) {
        newArray[newArray.length - 1].push(item);
      } else {
        newArray.push([]);
      }
    });
    return newArray;
  }
}
