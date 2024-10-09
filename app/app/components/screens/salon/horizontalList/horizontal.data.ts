import { Calendar, Info, Scissors, TicketPercent } from 'lucide-react-native'
import { IHorizontalItem } from './horizontal.interface'

export const horizontalItems: IHorizontalItem[] = [
	{
		icon: Info,
		title: 'Sobre'
	},
	{
		icon: Scissors,
		title: 'Serviços'
	},
	{
		icon: Calendar,
		title: 'Agendamentos'
	},
	{
		icon: TicketPercent,
		title:'Cupons'
	}
]