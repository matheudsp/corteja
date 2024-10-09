import { FC } from 'react'


import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { Box } from 'components/ui/box'
import { Text } from 'components/ui/text'
import { Image } from 'components/ui/image'
import { Pressable } from 'components/ui/pressable'
const Banner: FC = () => {
	const { navigate } = useTypedNavigation()

	return (
		<Box className='mt-4 w-full items-center bg-tertiary-400 px-5 py-5 rounded-2xl justify-between flex-row'>
			<Box>
				<Text className='font-medium w-56 text-white text-xl'>
					A melhor escolha para você
				</Text>

				<Pressable
					
					className='bg-black p-2 rounded-full w-36 mt-4'
				>
					<Text className='text-white  font-medium text-center'>
						Agende agora
					</Text>
				</Pressable>
			</Box>
			<Box>
				<Image
					source={require('../../../../assets/logo.png')}
					alt='banner image'
					className="w-28 h-28"
				/>
			</Box>
		</Box>
	)
}

export default Banner