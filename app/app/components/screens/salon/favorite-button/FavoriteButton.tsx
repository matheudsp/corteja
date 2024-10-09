import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC, useContext } from 'react'

import { UserService } from '@/services/user.service'

import { useProfile } from '../../profile/useProfile'

import { Button } from 'components/ui/button'
import { Pressable } from 'components/ui/pressable'
import { ThemeContext } from '@/providers/ThemeContext'


interface IFavoriteButton {
	SalonId: any
	className?: string
	iconSize: number
}

const FavoriteButton: FC<IFavoriteButton> = ({ SalonId, className, iconSize}) => {
	const { profile } = useProfile()
	const {colorMode} = useContext(ThemeContext)
	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationKey: ['toggle favorite'],
		mutationFn: () => UserService.toggleFavorite(SalonId),

		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['get profile'] })
		}
	})

	if (!profile) return null

	const isExists = profile.favorites.some(
		favorite => favorite.id === SalonId
	)

	return (
		<Pressable
			
			className={` ${className}`}
			onPress={() => mutate()}>

			{isExists ? (
				<MaterialCommunityIcons
					name='bookmark'
					size={iconSize}
					color='rgb(231 129 40)'
				/>
			) : (
				<MaterialCommunityIcons
					name='bookmark-outline'
					size={iconSize}
					color={colorMode === 'light' ? 'rgb(65 64 64)' : 'rgb(229 229 229)'}
					
				/>
			)}
		</Pressable>
	)
}

export default FavoriteButton