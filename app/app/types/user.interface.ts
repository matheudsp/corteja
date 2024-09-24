import { ISalon } from './salon.interface'

export interface IUser {
	id: string
	email: string
	password: string
	name: string
	avatarPath: string
	favorites: ISalon[]
}