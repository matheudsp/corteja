import Profile from '@/components/screens/profile/Profile'
import Home from '@/components/screens/home/Home'

import { IRoute } from './navigation.types'
import Search from '@/components/screens/search/Search'
import Salon from '@/components/screens/salon/Salon'


export const routes: IRoute[] = [
	{
		name: 'Home',
		component: Home
	},
	// {
	// 	name: 'Favorites',
	// 	component: Favorites
	// },
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
]