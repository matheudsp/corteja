
import React, { FC } from 'react'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useProfile } from '../../profile/useProfile'
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useNavigation } from '@react-navigation/native';

import { Box } from 'components/ui/box'
import { Text } from 'components/ui/text'
import { Icon } from 'components/ui/icon'
import { SearchIcon } from 'components/ui/icon'
import { Pressable } from 'components/ui/pressable'
import ModeChangeButton from '@/components/ui/ModeChangeButton';
import { VStack } from 'components/ui/vstack';
import { HStack } from 'components/ui/hstack';

dayjs.locale('pt-br');

const formattedDate = dayjs().format('dddd, D MMM YYYY');


const HomeHeader: FC = () => {
	const { navigate } = useTypedNavigation()


	const { profile } = useProfile()

	return (

		<VStack space='md' className='w-full'>
			<HStack className='justify-between py-2 items-center'>
				<Box className='justify-center items-start'>
					<Text className='text-xl font-light text-typography-700'>{formattedDate}</Text>
					<Text className='text-2xl uppercase font-normal text-typography-900'>Olá, {profile?.name}</Text>
				</Box>
				<ModeChangeButton />
			</HStack>

			<Pressable
				className='w-full bg-background-100 border border-outline-300 rounded-2xl p-4 my-1.5 items-center justify-start flex-row'
				onPress={() => { navigate('Search') }}>
				<Icon
					as={SearchIcon}
					size='md'

				/>
				<Text className='text-lg text-typography-500 font-mono uppercase pl-3'>Procurar</Text>


			</Pressable>

		</VStack>

	)
}

export default HomeHeader