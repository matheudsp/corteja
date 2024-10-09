
import { ISalon } from '@/types/salon.interface'


export interface ICatalog {
	title?: string
	saloons: ISalon[]
	filterButton?: boolean
	isLoading: boolean
}