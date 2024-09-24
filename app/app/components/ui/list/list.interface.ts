
import { TypeMaterialIconNames } from '@/types/icon.interface'

import { TypeRootStackParamList } from '@/navigation/navigation.types'

export interface IListItem {
	iconName: TypeMaterialIconNames
	path?: keyof TypeRootStackParamList
    title: string
}

export interface IList {

}

export type TypeNavigate = (screenName: keyof TypeRootStackParamList) => void