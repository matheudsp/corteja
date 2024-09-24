import { FC } from 'react'
import { Image, Pressable, TouchableOpacity, View } from 'react-native'

import { useTypedNavigation } from '@/hooks/useTypedNavigation'



import { getMediaSource } from '@/utils/getMediaSource'

import SalonInfo from './salonInfo'


import { ISalon } from '@/types/salon.interface'

interface ISalonItem {
	salon: ISalon
}

const SalonItem: FC<ISalonItem> = ({ salon }) => {
	const { navigate } = useTypedNavigation()

	return (
		<TouchableOpacity
			onPress={() => navigate('Salon', { id: salon.id })}
			className=' w-full flex-row mb-3.5'>
			<View
				className='bg-gray-100 w-32 h-32 rounded-xl relative overflow-hidden flex items-center justify-center'>
				<Image
					// source={getMediaSource(salon.image)}
					source={{ uri: `${salon.image}` }}

					width={130}
					height={130}
				/>
			</View>
			<SalonInfo salon={salon} />
		</TouchableOpacity>
	)
}

export default SalonItem