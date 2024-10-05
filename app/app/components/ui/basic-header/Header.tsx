
import { FC } from 'react'
import { Pressable, Text, View } from 'react-native'
import Icon from '../icon/Icon'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useNavigation } from '@react-navigation/native'


interface HeaderProps {
	title: string
}


const BasicHeader: FC<HeaderProps> = ({ title }) => {
	const navigation = useNavigation()

	return (

		<View className='flex-row items-center h-16 w-full'>
			<Pressable onPress={(() => {navigation.goBack()})} className='w-[20%] h-full justify-center items-center'>
				<Icon iconName='arrow-left' iconSize={26} iconColor='#111827' />
			</Pressable>
			<View className='w-[80%]'>
				<Text className='text-xl font-medium'> {title}</Text>
			</View>
		</View>

	)
}

export default BasicHeader