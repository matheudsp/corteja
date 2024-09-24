import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@ApiProperty()
	@IsEmail()
	email: string

	@ApiProperty()
	@MinLength(6, {message: 'A senha deve ter mais que 6 caracteres'})
	@IsString()
	password: string
}