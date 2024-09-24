import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsArray, IsInt, IsNumber, IsString } from 'class-validator'



export class CreateServiceRenderedDto {
    @ApiProperty()
    @IsString()
    salonId: string;

    @ApiProperty()
    @IsArray()  // Declare it as an array
    @IsString({ each: true })  // Validate that each item in the array is a string
    salonServices: string[];

    @ApiProperty()
    @IsArray()
    @IsString({ each: true })  // Validate each employee ID is a string
    employees: string[];

    @ApiProperty()
    @IsArray()
    @IsInt({ each: true })  // Validate each day is an integer
    days: number[];

    @ApiProperty()
    @IsString()
    hourStart: string;

    @ApiProperty()
    @IsString()
    hourEnd: string;
}

export class UpdateServiceRenderedDto extends PartialType(CreateServiceRenderedDto){
    
}
