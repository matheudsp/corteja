import { FC } from 'react'

import { Text } from 'components/ui/text'
import { HStack } from 'components/ui/hstack'
import { VStack } from 'components/ui/vstack'
import { ISalon } from '@/types/salon.interface'
import { Icon } from 'components/ui/icon'
import { Navigation } from 'lucide-react-native'
import { Button } from 'components/ui/button'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useProfile } from '@/components/screens/profile/useProfile'
import { UserService } from '@/services/user.service'


interface ISalonInfo {
	salon: ISalon
}

const SalonInfo: FC<ISalonInfo> = ({ salon }) => {
	const { navigate } = useTypedNavigation()
	const { profile } = useProfile()

	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationKey: ['toggle favorite'],
		mutationFn: () => UserService.toggleFavorite(salon.id),

		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['get profile'] })
		}
	})

	if (!profile) return null

	const isExists = profile.favorites.some(
		favorite => favorite.id === salon.id
	)


	return (
		<VStack space='xs' className={`flex-col w-full p-1.5 justify-start items-start`}>
			<HStack space='xs'>
				<Text className='text-tertiary-400'>OPEN NOW</Text>
				<Text>{'•'}</Text>
				<Text>8:00-18:00</Text>
			</HStack>
			<Text numberOfLines={2} className='text-xl font-bold uppercase text-typography-900'>{salon.name}</Text>
			{salon.distance && <HStack className='items-center '>
				<Icon

					as={Navigation}
					size="md"
					className={'text-tertiary-400'}
				/>
				<Text className='ml-1 text-lg font-normal text-typography-900'>{salon.distance || "Indefinido"} km</Text>
			</HStack>}
			<HStack space='md' className='w-full'>
				<Button
					onPress={() => mutate()}
					size='xl'
					className='bg-typography-800 w-[25%] rounded-lg p-2 flex items-center justify-center'>
					{isExists ? (
						<MaterialCommunityIcons
							name='bookmark'
							size={20}
							color='rgb(231 129 40)'
						/>
					) : (
						<MaterialCommunityIcons
							name='bookmark-outline'
							size={20}
							color='#b8b8b8'
						/>
					)}
				</Button>
				<Button
					onPress={() => navigate('Salon', { id: salon.id })}
					size='xl'
					className='bg-tertiary-400 w-[70%] rounded-lg'>
					<Text className='text-white font-medium text-lg uppercase'>Agendar</Text>
				</Button>
			</HStack>
		</VStack>
	)
}

export default SalonInfo