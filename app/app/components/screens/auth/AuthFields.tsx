import { FC } from 'react'
import { Control } from 'react-hook-form'

import Field from '@/components/ui/field/Field'

import { IAuthFormData } from '@/types/auth.interface'

import { validEmail } from './email.regex'
import { View, Text, TouchableOpacity } from 'react-native'

export interface IAuthFields {
	control: Control<IAuthFormData>
	isPassRequired?: boolean
}

const AuthFields: FC<IAuthFields> = ({ control, isPassRequired }) => {
	return (
		<View className="flex flex-col mt-6 max-w-full text-sm w-[339px]">
			<View className="flex flex-col w-full whitespace-nowrap max-w-[339px]">
				<Text className="font-medium text-gray-900">E-mail</Text>

				<Field<IAuthFormData>
					placeholder='johndoe@gmail.com'
					control={control}
					name='email'
					rules={{
						required: 'E-mail é obrigatório!',
						pattern: {
							value: validEmail,
							message: 'Informe um e-mail válido'
						}
					}}
					keyboardType='email-address'
				/>
			</View>

			<View className="flex flex-col mt-3 w-full text-gray-900 whitespace-nowrap max-w-[339px]">
				<Text className="font-medium">Senha</Text>
				<Field<IAuthFormData>
					placeholder='*********'
					control={control}
					name='password'
					secureTextEntry
					rules={{
						required: 'Senha é obrigatória!',
						minLength: {
							value: 6,
							message: 'É preciso ter no mínimo 6 caracteres'
						}
					}}
				/>

			</View>
			

		</View>
	)
}

export default AuthFields