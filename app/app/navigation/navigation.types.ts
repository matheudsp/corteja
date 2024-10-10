import { ComponentType } from 'react'

export type TypeRootStackParamList = {
	Auth: undefined
	Home: undefined
	Favorites: undefined
	Search: undefined
	Explorer: undefined
	Profile: undefined
	AppointmentHistory:undefined
	Appointment: undefined
	Salon: {
		id:string
	}

}

export interface IRoute {
	name: keyof TypeRootStackParamList
	component: ComponentType
}