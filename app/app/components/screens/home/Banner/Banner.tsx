import { FC } from 'react'
import { Image, Pressable, Text, View } from 'react-native'

import { useTypedNavigation } from '@/hooks/useTypedNavigation'

const Banner: FC = () => {
	const { navigate } = useTypedNavigation()

	return (
		<View className='mt-4 w-full items-center bg-[#475baa] px-5 py-5 rounded-2xl justify-between flex-row'>
			<View>
				<Text className='font-medium w-56 text-white text-xl'>
					A melhor escolha para você
				</Text>

				<Pressable
					onPress={() => navigate('Explorer')}
					className='bg-black py-2 rounded-full w-32 mt-4'
				>
					<Text className='text-white font-medium text-center'>
						Agende agora
					</Text>
				</Pressable>
			</View>
			<View>
				<Image
					source={require('../../../../assets/logo.png')}
					className="w-28 h-28"
				/>
			</View>
		</View>
	)
}

export default Banner