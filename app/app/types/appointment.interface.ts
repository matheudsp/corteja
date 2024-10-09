export interface IAppointmentRequest {
  
    customerId?: string,
    employeeId?: string,
    salonServiceId: string,
    salonId: string,
    couponId?: string,
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


export interface IAppointmentSchedule {
  schedule: IScheduleItem[];
}
