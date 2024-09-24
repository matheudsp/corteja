import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class AddressDto {

    @ApiProperty()
	@IsString()
    @IsOptional()
    city: string

    @ApiProperty()
	@IsString()
    @IsOptional()
    district: string
	
    @ApiProperty()
	@IsString()
    @IsOptional()
    street: string
	
    @ApiProperty()
	@IsString()
    @IsOptional()
    zipcode: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    state: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    number: string
}