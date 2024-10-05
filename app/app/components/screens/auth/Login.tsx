import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Pressable, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import Loader from '@/components/ui/Loader'
import Button from '@/components/ui/button/Button'

import { IAuthFormData } from '@/types/auth.interface'

import AuthFields from './AuthFields'
import { useAuthMutations } from './useAuthMutations'
import Layout from '@/components/layout/Layout';


const Login: React.FC = () => {

	const { handleSubmit, reset, control } = useForm<IAuthFormData>({
		mode: 'onChange'
	})

	const { isLoading, loginSync } = useAuthMutations(reset)


	const onSubmit: SubmitHandler<IAuthFormData> = data => {
		loginSync(data)
	}

	return (
		<Layout withoutPadding>
			<ScrollView className="flex overflow-hidden relative flex-col w-full h-full  max-sm:h-[694px]">
				<View className='items-center justify-center w-full h-[180px] '>
					<Image
						source={require('../../../assets/logo.png')}
						className="w-40 h-40"
					/>
				</View>
				<View className="flex z-0 flex-col px-6 rounded-3xl w-full self-center">

					<View className="flex flex-col pt-6 max-w-full">
						<Text className="text-2xl font-bold text-slate-700">Bem-vindo de volta 👋</Text>
						<Text className="mt-2 text-base text-gray-500">
							Por favor, insira suas informações de login abaixo para acessar sua conta.
						</Text>
					</View>
					{isLoading ? (
						<Loader />
					) : (
						<>
							<AuthFields control={control} isPassRequired />
							<TouchableOpacity className='w-full my-2'>
								<Text className=" font-bold text-right text-[#475baa]">Esqueceu a senha?</Text>
							</TouchableOpacity>

							<Button className='overflow-hidden mt-3 px-2.5 py-4 self-center max-w-full text-base font-bold text-center text-white whitespace-nowrap rounded-lg w-[339px]'
								onPress={handleSubmit(onSubmit)}>
								{'Entrar'}
							</Button>
							<View className='flex-row justify-between w-full'>
								<Button className='overflow-hidden mt-3 px-2.5 py-4 self-center max-w-[48%] text-base font-bold text-center whitespace-nowrap rounded-lg w-[160px]'
									onPress={() => { }}>
									<AntDesign name="google" size={24} color="white" />
								</Button>
								<Button className='overflow-hidden mt-3 px-2.5 py-4 self-center max-w-[48%] text-base font-bold text-center  whitespace-nowrap rounded-lg w-[160px]'
									onPress={() => { }}>
									<AntDesign name="apple1" size={24} color="white" />
								</Button>
							</View>


							<TouchableOpacity className='mt-5'>
								<Text className='font-medium text-base text-center text-slate-700'>
									Não tem uma conta?
									<Text className='text-[#475baa]'>
										{' Registrar'}
									</Text>
								</Text>
							</TouchableOpacity>


						</>
					)}

				</View>

			</ScrollView>
		</Layout>
	);
};

export default Login;