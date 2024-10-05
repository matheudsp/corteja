import Profile from '@/components/screens/profile/Profile'
import Home from '@/components/screens/home/Home'

import { IRoute } from './navigation.types'
import Search from '@/components/screens/search/Search'
import Salon from '@/components/screens/salon/Salon'
import Appointment from '@/components/screens/appointment/Appointment'
import AppointmentHistory from '@/components/screens/appointmentHistory/appointmentHistory'


export const routes: IRoute[] = [
	{
		name: 'Home',
		component: Home
	},
	{
		name: 'Search',
		component: Search
	},
	{
		name: 'Salon',
		component: Salon
	},
	{
		name: 'Profile',
		component: Profile
	},
	{
		name:'AppointmentHistory',
		component: AppointmentHistory
	},
	{
		name: 'Appointment',
		component: Appointment
	},
	// {
	// 	name: 'Favorites',
	// 	component: Favorites
	// },
]