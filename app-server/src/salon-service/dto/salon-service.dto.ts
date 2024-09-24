import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'

enum Status {
    Enabled = 'Enabled',
    Disabled = 'Disabled'
}

export class CreateSalonServiceDto {
    @ApiProperty()
    @IsString()
    salonId:string

    @ApiProperty()
	@IsNumber()
    price: number

    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsNumber()
    duration: number
    
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    recurrence: number
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    image: string

    
}

export class UpdateSalonServiceDto extends PartialType(CreateSalonServiceDto){
    @ApiProperty()
    @IsEnum(Status)
    @IsOptional()
    status: Status
    
}