import { request } from './api/request.api';

import { IAppointmentSchedule, IAppointmentRequest } from '@/types/appointment.interface';
import { getAppointmentsUrl } from '@/config/api.config';

export const AppointmentService = {
  async verifyDisponibility({ date, salonId, salonServiceId }: IAppointmentRequest) {

    return request<IAppointmentSchedule>({
      url: getAppointmentsUrl(`/verify/`),
      method: 'POST',
      data: { date, salonServiceId, salonId },

    });



  },

  async createAppointment(data: IAppointmentRequest) {
    return request<IAppointmentRequest>({
      url: getAppointmentsUrl(''),
      method: 'POST',
      data

    })
  }
};
