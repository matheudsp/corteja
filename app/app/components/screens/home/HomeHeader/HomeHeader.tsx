import { Ionicons } from '@expo/vector-icons'
import { FC } from 'react'
import { Pressable, Text, View, Image } from 'react-native'

import { useTypedNavigation } from '@/hooks/useTypedNavigation'

import { useProfile } from '../../profile/useProfile'

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

const formattedDate = dayjs().format('dddd, D MMM YYYY'); 


const HomeHeader: FC = () => {
	const { navigate } = useTypedNavigation()

	const { profile } = useProfile()

	return (

		<View className='flex-row justify-between items-center'>
			<View className='flex-col'>
				<Text className='font-medium text-2xl'>
					{profile?.name}
				</Text>
				<Text className='font-normal text-base'>
					{formattedDate}
				</Text>
			</View>

			<View className='my-6 items-center justify-center'>
				<Image
					source={{ uri: profile?.avatarPath }}
					className='w-12 h-12 rounded-full '
				/>
			</View>
		</View>

	)
}

export default HomeHeader