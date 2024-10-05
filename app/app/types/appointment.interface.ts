export interface IAppointmentRequest {
  salonId: string,
  salonServiceId: string,
  date: string
}


export interface IEmployee {
  id: string;
  name: string;
  avatarPath: string;
  times: string[];
}

export interface IScheduleItem {
  [date: string]: {
    employees: IEmployee[];
  };
}


export interface IAppointment {
  schedule: IScheduleItem[];
}
