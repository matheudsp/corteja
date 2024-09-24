import { ApiProperty } from '@nestjs/swagger'
import { ArrayMaxSize, ArrayMinSize, IsArray, IsNumber, IsOptional, IsString, } from 'class-validator'



export class FilterDto {

    @ApiProperty()
    @IsString()
    @IsOptional()
    name: string

    @ApiProperty({
        description: 'Array contendo latitude e longitude',
        example: [-6.768254037182342, -43.02139515972087],
    })
    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    @IsNumber({}, { each: true })
    @IsOptional()
    coordinates: number[]

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    distanceLimit: number

    @ApiProperty()
    @IsString()
    @IsOptional()
    city: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    state: string

}