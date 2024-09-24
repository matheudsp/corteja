import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator'

enum Status {
	Enabled = 'Enabled',
	Disabled = 'Disabled'
}

export class CreateSalonDto {

	@ApiProperty()
	@IsEmail()
	email: string

	@ApiProperty()
	@IsString()
	name: string

	@ApiProperty()
	@IsString()
	@IsOptional()
	phone: string


	@ApiProperty()
	@IsString()
	@IsOptional()
	image: string

	@ApiProperty()
	@MinLength(6, { message: 'A senha deve ter mais que 6 caracteres' })
	@IsString()
	password: string
}

export class UpdateSalonDto extends PartialType(CreateSalonDto) {
	@ApiProperty()
	@IsEnum(Status)
	@IsOptional()
	status: Status

}
