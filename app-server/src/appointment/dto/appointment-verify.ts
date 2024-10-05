
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString } from "class-validator";

export class AppointmentVerifyDto {
    @ApiProperty()
    @IsString()
    salonId: string

    @ApiProperty()
    @IsString()
    salonServiceId: string

    @ApiProperty()
    @IsString()
    date: string
    
}

