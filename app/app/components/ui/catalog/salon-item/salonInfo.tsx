import { FC } from 'react'
import { Text, View } from 'react-native'




import Icon from '../../icon/Icon'
import { ISalon } from '@/types/salon.interface'



interface ISalonInfo {
	salon: ISalon
}

const SalonInfo: FC<ISalonInfo> = ({ salon }) => {
	return (
		<View className={`flex-col px-3 ${salon.distance && 'justify-between'} ${!salon.distance && 'justify-start'} mb-3 items-start`}>
			<Text numberOfLines={1} className='text-xl font-bold leading-6 text-[#000000]'>{salon.name}</Text>
			<Text className='text-[#8683A1] text-base font-light flex-shrink-0 w-4/6'>{salon.address.district} - {salon.address.street} - Nº {salon.address.number}</Text>
			{salon.distance && <View className='font-normal text-sm items-center flex-row '>
				<Icon

					iconName={'map-pin'}
					iconSize={16}
					iconColor={'#8683A1'}
				/>
				<Text className='ml-1 text-base text-[#8683A1]'>{salon.distance || "Indefinido"} <Text className='text-sm'>km</Text></Text>
			</View>}
		</View>
	)
}

export default SalonInfo