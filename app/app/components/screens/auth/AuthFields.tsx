import { FC } from 'react'
import { Control } from 'react-hook-form'

import Field from '@/components/ui/field/Field'

import { IAuthFormData } from '@/types/auth.interface'

import { validEmail } from './email.regex'

interface IAuthFields {
	control: Control<IAuthFormData>
	isPassRequired?: boolean
}

const AuthFields: FC<IAuthFields> = ({ control, isPassRequired }) => {
	return (
		<>
			<Field<IAuthFormData>
				placeholder='Seu e-mail'
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
			<Field<IAuthFormData>
				placeholder='Sua senha'
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
		</>
	)
}

export default AuthFields