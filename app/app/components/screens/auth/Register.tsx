import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Pressable, Text, View, Image, TouchableOpacity } from 'react-native'

import Loader from '@/components/ui/Loader'
import Button from '@/components/ui/button/Button'

import { IAuthFormData } from '@/types/auth.interface'

import AuthFields from './AuthFields'
import { useAuthMutations } from './useAuthMutations'



const Register: React.FC = () => {
	const [isReg, setIsReg] = useState(false)

	const { handleSubmit, reset, control } = useForm<IAuthFormData>({
		mode: 'onChange'
	})

	const { isLoading, loginSync } = useAuthMutations(reset)

	const onSubmit: SubmitHandler<IAuthFormData> = data => {
		loginSync(data)
	}

	return (
		<View className="flex overflow-hidden relative flex-col items-end w-full bg-white h-[812px] max-sm:h-[694px]">
			
			<View className="flex z-0 flex-col w-full bg-white rounded-3xl max-w-[375px] self-center">
				<View className="flex flex-col items-center  pt-6 w-full">
					<View className="flex flex-col max-w-full w-[325px]">
						<Text className="text-3xl font-bold text-slate-700">Crie sua conta agora!🎇</Text>
					</View>
					{isLoading ? (
						<Loader />
					) : (
						<>
							<AuthFields control={control} isPassRequired />

							<Button className='overflow-hidden px-2.5 py-4 self-center max-w-full text-base font-bold text-center text-white whitespace-nowrap rounded-lg bg-slate-700 w-[339px]' onPress={handleSubmit(onSubmit)}>
								Registrar
							</Button>

							<TouchableOpacity onPress={() => { }}>
								<Text className='mt-5 font-medium text-base text-center text-slate-700'>
									Não tem uma conta?
									<Text className='text-[#47AA52]'>
										{' Registrar'}
									</Text>
								</Text>
							</TouchableOpacity>
						</>
					)}

				</View>
			</View>
		</View>
	);
};

export default Register;