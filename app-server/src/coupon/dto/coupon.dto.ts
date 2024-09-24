import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'

enum Status {
    Enabled = 'Enabled',
    Disabled = 'Disabled'
}

export class CreateCouponDto {
    @ApiProperty()
    @IsString()
    salonId: string

    @ApiProperty()
	@IsNumber()
    price: number

    @ApiProperty()
    @IsOptional()
    @IsString()
    dateStart: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    dateEnd: string
    
    @ApiProperty()
    @IsString()
    code: string
    
    @ApiProperty()
    @IsNumber()
    quantityUse: number
    
}

export class UpdateCouponDto extends PartialType(CreateCouponDto){
    @ApiProperty()
    @IsEnum(Status)
    @IsOptional()
    status: Status
    
}