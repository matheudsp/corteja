import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CreateAppoitmentDto {
    @ApiProperty()
	@IsString()
	customerId: string
    
    @ApiProperty()
    @IsString()
	employeeId: string

    @ApiProperty()
    @IsString()
	serviceId: string

    @ApiProperty()
    @IsString()
	salonId: string

    @ApiProperty()
    @IsString()
    @IsOptional()
	couponId: string
    
    @ApiProperty()
    @IsString()
    date: string
}

export class UpdateAppointmentDto extends PartialType(CreateAppoitmentDto){
    
}