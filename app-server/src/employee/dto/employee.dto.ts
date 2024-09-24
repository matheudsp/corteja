import { IsString, IsOptional, IsEnum, IsArray, ArrayNotEmpty } from 'class-validator';
import { Status } from '@prisma/client';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  salonId: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  avatarPath?: string;

  @ApiProperty()
  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  services: string[]; // Array de IDs dos serviços vinculados ao colaborador
}

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) { }
