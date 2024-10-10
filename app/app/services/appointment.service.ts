import { request } from './api/request.api';

import { IAppointmentSchedule, IAppointment } from '@/types/appointment.interface';
import { getAppointmentsUrl } from '@/config/api.config';

export const AppointmentService = {
  async verifyDisponibility({ date, salonId, salonServiceId }: IAppointment) {

    return request<IAppointmentSchedule>({
      url: getAppointmentsUrl(`/verify/`),
      method: 'POST',
      data: { date, salonServiceId, salonId },

    });



  },

  async createAppointment(data: IAppointment) {
    return request<IAppointment>({
      url: getAppointmentsUrl(''),
      method: 'POST',
      data

    })
  }
};
