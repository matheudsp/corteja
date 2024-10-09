import { Calendar, Home, Search, User } from 'lucide-react-native'
import { IMenuItem } from './menu.interface'

export const menuItems: IMenuItem[] = [
	{
		icon: Home,
		path: 'Home',
		label:'Início'
	},
	{
		icon: Calendar,
		path: 'AppointmentHistory',
		label:'Agendamentos'
	},
	{
		icon: User,
		path: 'Profile',
		label:'Meu Perfil'
	}
]