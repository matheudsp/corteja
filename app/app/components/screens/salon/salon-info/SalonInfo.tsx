import { FC } from 'react'
import { Text, View } from 'react-native'



import { ISalonComponent } from '../salon-page.interface'
import Icon from '@/components/ui/icon/Icon'

const SalonInfo: FC<ISalonComponent> = ({ salon }) => {
	return (
		<View className='my-4 space-y-2'>
			<Text className='font-bold text-2xl'>{salon.name}</Text>
			<View className=' items-center flex-row'>
				<Icon iconName='map-pin' iconSize={18} iconColor={'#8683A1'} />
				<Text className='text-gray-600 text-lg font-light'> {salon.address.street}, Nº {salon.address.number}</Text>
			</View>
		</View>
	)
}

export default SalonInfo