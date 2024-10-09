import { FC } from 'react'

import { Box } from 'components/ui/box'
import { Text } from 'components/ui/text'
import { Image } from 'components/ui/image'
import { Button } from 'components/ui/button'

import Layout from '@/components/layout/Layout'
import Heading from '@/components/ui/Heading'
// import Button from '@/components/ui/button/Button'

import { useAuth } from '@/hooks/useAuth'

import { AuthService } from '@/services/auth/auth.service'

import { useProfile } from './useProfile'
import List from '@/components/ui/list/List'

const Profile: FC = () => {
	const { setUser } = useAuth()

	const { profile } = useProfile()

	return (
		<Layout>
			<Box className='justify-between flex-row items-center'>
				<Heading className=''>Meu Perfil</Heading>

				<Image
					alt='logo'
					source={require('../../../assets/logo.png')}
					className="w-14 h-14"
				/>

			</Box>

			<Box className=' items-start mt-2 w-full h-28 justify-evenly flex-row rounded-3xl bg-blue-100'>
				<Box className='w-2/6 items-center h-full '>
					<Image
						alt='profile image'
						source={{ uri: profile?.avatarPath }}
						className='w-20 h-20 rounded-full border-4 my-auto'
					/>
				</Box>
				<Box className='flex-col w-4/6  h-full items-start justify-center'>
					<Box className=' bg-indigo-600 px-2 py-1  rounded-2xl'>
						<Text className='text-xs font-normal text-white'>Platinum</Text>
					</Box>
					<Text className='text-lg font-medium'>{profile?.name}</Text>
					<Text>{profile?.email}</Text>
				</Box>

			</Box>
			<Box>

				<List />


			</Box>

			<Button
				onPress={() => AuthService.logout().then(() => setUser(null))}
				className='mt-5'
			>
				<Text>Sair</Text>
			</Button>

			<Text className=' my-4 text-xs font-light'>{profile?.id} </Text>

		</Layout>
	)
}

export default Profile