import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC } from 'react'

import { UserService } from '@/services/user.service'

import { useProfile } from '../../screens/profile/useProfile'

import { Button } from 'components/ui/button'
import SalonButton from '@/components/screens/salon/SalonButton'

interface IFavoriteButton {
	SalonId: string
	className: string
}

const FavoriteButton: FC<IFavoriteButton> = ({ SalonId, className }) => {
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
		<SalonButton
		className={`  ${className}`}
			onPress={() => mutate()}>
			
			{isExists ? (
				<MaterialCommunityIcons
					name='heart'
					size={24}
					color='#DC3F41'
				/>
			) : (
				<MaterialCommunityIcons
					name='heart-outline'
					size={24}
					className='text-typography-100'
				/>
			)}
		</SalonButton>
	)
}

export default FavoriteButton