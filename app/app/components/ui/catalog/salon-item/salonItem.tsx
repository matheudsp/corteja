import { FC } from 'react'
import { Box } from 'components/ui/box'
import { VStack } from 'components/ui/vstack'
import { Image } from 'components/ui/image'







import { getMediaSource } from '@/utils/getMediaSource'

import SalonInfo from './salonInfo'


import { ISalon } from '@/types/salon.interface'

interface ISalonItem {
	salon: ISalon
}

const SalonItem: FC<ISalonItem> = ({ salon }) => {


	return (
		<VStack
			
			className='bg-typography-200 border w-72 max-w-72 border-typography-400 rounded-3xl flex-col items-center p-1.5'>
			<Box
				
				className='border border-typography-400 w-full h-48 rounded-2xl relative overflow-hidden flex items-center justify-center'>
				<Image
					
					// source={getMediaSource(salon.image)}
					source={{ uri: `${salon.image}` }}
					alt='salon logo'
					size='full'
				/>
			</Box>
			<SalonInfo  salon={salon} />
		</VStack>
	)
}

export default SalonItem