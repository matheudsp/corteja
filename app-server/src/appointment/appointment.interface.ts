export interface CreateAvailableDaysDto {
    data: string;
    salaoId: string;
    servicoId: string;
  }
  
  export interface Employee {
    availableTimes: any;
    id: string;
    name: string;
    avatar: string;
  }
  
  export interface ServicesRendered {
    [serviceId: string]: string[];
  }
  
  export interface DateAvailability {
    [date: string]: {
      employees: Employee[];
      servicesRendered: ServicesRendered;
    };
  }
  