import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC } from 'react'

import { UserService } from '@/services/user.service'

import { useProfile } from '../../profile/useProfile'
import SalonButton from '../SalonButton'

interface IFavoriteButton {
	SalonId: string
}

const FavoriteButton: FC<IFavoriteButton> = ({ SalonId }) => {
	const { profile } = useProfile()

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
		<SalonButton onPress={() => mutate()}>
			{isExists ? (
				<MaterialCommunityIcons
					name='heart'
					size={22}
					color='#DC3F41'
				/>
			) : (
				<MaterialCommunityIcons
					name='heart-outline'
					size={22}
					color='#555'
				/>
			)}
		</SalonButton>
	)
}

export default FavoriteButton