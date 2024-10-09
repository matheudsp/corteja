import { FC } from 'react'




import { ISalonComponent } from '../salon-page.interface'
import { Icon } from 'components/ui/icon'
import { Box } from 'components/ui/box'
import { Text } from 'components/ui/text'

import { MapPin } from 'lucide-react-native'
import { VStack } from 'components/ui/vstack'

const SalonInfo: FC<ISalonComponent> = ({ salon }) => {
	return (

		<VStack space='xs' className='my-4 px-4 rounded-t-2xl bg-background-default' >
			<Text className='font-bold text-2xl text-typography-900'>{salon.name}</Text>
			<Box className=' items-center flex-row'>
				<Icon as={MapPin} size='lg' className='text-tertiary-400' />
				<Text className='text-typography-700 text-lg font-light'> {salon.address.street}, Nº {salon.address.number}</Text>
			</Box>
		</VStack>

	)
}

export default SalonInfo