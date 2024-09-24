import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";


class DateDto{
    @ApiProperty()
    @IsString()
    start: string;

    @ApiProperty()
    @IsString()
    end: string;
}

export class AppointmentFilterDto {
    @ApiProperty()
    @ValidateNested()
    @Type(() => DateDto)
    date: DateDto

    @ApiProperty()
    @IsString()
    salonId: string
    
}

