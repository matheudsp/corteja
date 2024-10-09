

import { TypeRootStackParamList } from '@/navigation/navigation.types'
import { LucideIcon } from 'lucide-react-native'

export interface IMenuItem {
	icon: LucideIcon
	path: keyof TypeRootStackParamList
	label:string
}

export type TypeNavigate = (screenName: keyof TypeRootStackParamList) => void