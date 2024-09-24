import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Pressable, Text, View } from 'react-native'

import Loader from '@/components/ui/Loader'
import Button from '@/components/ui/button/Button'

import { IAuthFormData } from '@/types/auth.interface'

import AuthFields from './AuthFields'
import { useAuthMutations } from './useAuthMutations'

const Auth: FC = () => {
	const [isReg, setIsReg] = useState(false)

	const { handleSubmit, reset, control } = useForm<IAuthFormData>({
		mode: 'onChange'
	})

	const { isLoading, registerSync, loginSync } = useAuthMutations(reset)

	const onSubmit: SubmitHandler<IAuthFormData> = data => {
		if (isReg) registerSync(data)
		else loginSync(data)
	}

	return (
		<View className='mx-2 items-center justify-center h-full'>
			<View className='w-9/12'>
				<Text className='text-center text-black text-3xl font-medium mb-8'>
					{isReg ? 'Registrar' : 'Entrar'}
				</Text>
				{isLoading ? (
					<Loader />
				) : (
					<>
						<AuthFields control={control} isPassRequired />


						<Button onPress={handleSubmit(onSubmit)}>
							{isReg ? 'Registrar' : 'Entrar'}
						</Button>

						<Pressable onPress={() => setIsReg(!isReg)}>
							<Text className='text-black text-center text-base mt-6'>
								{isReg
									? 'Já tem conta? '
									: "Não tem uma conta? "}
								<Text className='text-[#47AA52]'>
									{isReg ? 'Entrar' : 'Registrar'}
								</Text>
							</Text>
						</Pressable>
					</>
				)}
			</View>
		</View>
	)
}

export default Auth