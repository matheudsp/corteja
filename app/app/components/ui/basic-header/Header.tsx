
import { FC } from 'react'
import { Text } from 'components/ui/text'
import { Pressable } from 'components/ui/pressable'
import { Box } from 'components/ui/box'
import { useNavigation } from '@react-navigation/native'
import { Icon } from 'components/ui/icon'
import { ArrowLeft } from 'lucide-react-native'
import { HStack } from 'components/ui/hstack'


interface HeaderProps {
	title: string
}


const BasicHeader: FC<HeaderProps> = ({ title }) => {
	const navigation = useNavigation()

	return (

		<HStack className='items-center h-16 w-full'>
			<Pressable onPress={(() => { navigation.goBack() })} className='w-[20%] h-full justify-center rounded-full items-center'>
				<Icon
					as={ArrowLeft}
					size="xl"
					className={'text-typography-900'}
				/>
			</Pressable>
			<Box className='w-[80%]'>
				<Text className='text-xl font-medium text-typography-900'> {title}</Text>
			</Box>
		</HStack>

	)
}

export default BasicHeader