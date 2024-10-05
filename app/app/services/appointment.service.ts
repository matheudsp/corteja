import { request } from './api/request.api';

import { IAppointment, IAppointmentRequest } from '@/types/appointment.interface';
import { getAppointmentsUrl } from '@/config/api.config';

export const AppointmentService = {
  async verifyDisponibility({date, salonId, salonServiceId}: IAppointmentRequest) {

    return request<IAppointment>({
      url: getAppointmentsUrl(`/verify/`),
      method: 'POST',
      data:{date, salonServiceId, salonId},
      
    });
   


  },
};
