import { FC } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import Heading from '../Heading'

import { ICatalog } from './catalog.interface'
import SalonItem from './salon-item/salonItem'
import Icon from '../icon/Icon'

const Catalog: FC<ICatalog> = ({ title, saloons, filterButton }) => {
	return (
		<View className='mb-16 mt-4'>
			<View className='flex-row py-2 justify-between flex items-center'>
				{title && <Heading>{title}</Heading>}
				{filterButton &&
					<TouchableOpacity className='bg-[#475baa] p-2 rounded-full'>
						<Icon
							iconColor='white'
							iconName='filter'
							iconSize={24}
						/>
					</TouchableOpacity>}

			</View>

			{saloons?.length ? (
				<View className='flex-row flex-wrap justify-between mt-4'>
					{saloons.map(salon => (
						<SalonItem key={salon.id} salon={salon} />
					))}
				</View>
			) : (
				<Text className='mt-2'>Salões não encontrados</Text>
			)}

			
		</View>
	)
}

export default Catalog