import { FC } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'

import Heading from '../Heading'

import { ICatalog } from './catalog.interface'
import SalonItem from './salon-item/salonItem'
import Icon from '../icon/Icon'

import { Text } from 'components/ui/text'
import { HStack } from 'components/ui/hstack'
import { VStack } from 'components/ui/vstack'
import SkeletonSalon from './salon-item/SkeletonSalon'


const Catalog: FC<ICatalog> = ({ title, saloons, filterButton, isLoading }) => {
	return (
		<VStack space="md" className='mb-16 mt-4'>
			<HStack className='p-4 justify-between flex items-center'>
				{title && <Heading className='uppercase text-xl font-medium text-typography-900'>{title}</Heading>}
				{filterButton &&
					<TouchableOpacity className='bg-tertiary-400 p-2 rounded-full'>
						<Icon
							iconColor='white'
							iconName='filter'
							iconSize={24}
						/>
					</TouchableOpacity>}

			</HStack>
			
			{isLoading ? ( 
				<SkeletonSalon />
			)
				:
				(saloons?.length ? (
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<HStack
					space='lg'
					className='px-4'>
					{saloons.map(salon => (
						<SalonItem key={salon.id} salon={salon} />
					))}
				</HStack>
			</ScrollView>
			) : (
			<Text className='mt-2 text-typography-900 text-lg font-medium'>Salões não encontrados</Text>
				))}





		</VStack>
	)
}

export default Catalog