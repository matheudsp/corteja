import { ComponentType } from 'react'

export type TypeRootStackParamList = {
	Auth: undefined
	Home: undefined
	Favorites: undefined
	Search: undefined
	Explorer: undefined
	Profile: undefined
	AppointmentHistory:undefined
	Appointment: {
		salonServiceId: string,
		salonId:string,
		salonName: string,
		salonServiceName: string,
		salonAvatar: string,
		salonServicePrice: number,
		salonServiceDuration: number
	}
	Salon: {
		id:string
	}

}

export interface IRoute {
	name: keyof TypeRootStackParamList
	component: ComponentType
}