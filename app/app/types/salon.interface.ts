// Tipo para coordenadas geográficas
type GeoCoordinates = [number, number];

// Tipo para endereço
interface Address {
  id: string;
  salonId: string;
  street: string;
  district: string;
  city: string;
  state: string;
  zipcode: string;
  number: string;
  country: string;
}

// Tipo para serviços do salão
export interface ISalonService {
  id: string;
  salonId: string;
  createdAt: string;
  updatedAt: string;
  image: string;
  name: string;
  price: number;
  duration: number;
  recurrence: number;
  status: string;
}

// Tipo para cupons
interface Coupon {
  id: string;
  createdAt: string;
  updatedAt: string;
  price: number;
  dateStart: string;
  dateEnd: string;
  code: string;
  quantityUse: number;
  remainingUses: number;
  status: string;
  salonId: string;
}

// Tipo para serviços renderizados
interface ServiceRendered {
  id: string;
  createdAt: string;
  updatedAt: string;
  days: number[];
  hourStart: string;
  hourEnd: string;
  salonId: string;
}

// Tipo para cliente
interface Customer {
  id: string;
  name: string;
}

// Tipo para funcionário
interface Employee {
  id: string;
  salonId: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  avatarPath: string;
  status: string;
}

// Tipo para serviços do salão em um agendamento
interface SalonServiceInAppointment {
  id: string;
  name: string;
}

// Tipo para agendamento
interface Appointment {
  id: string;
  date: string;
  customer: Customer;
  salonService: SalonServiceInAppointment;
  employee: Employee;
}

// Tipo para o salão
export interface ISalon {
  distance: any;
  image: string;
  id: string;
  name: string;
  createdAt: string;
  geoCoordinates: GeoCoordinates;
  employee: Employee[];
  address: Address;
  salonServices: ISalonService[];
  coupons: Coupon[];
  servicesRendered: ServiceRendered[];
  appointments: Appointment[];
}
