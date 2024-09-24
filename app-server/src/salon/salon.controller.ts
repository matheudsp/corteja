import { Controller, Query, UsePipes, ValidationPipe, Get, HttpCode, Post, Param, Put, Body, Delete} from '@nestjs/common';
import { SalonService } from './salon.service';
import { CreateSalonDto, UpdateSalonDto } from './dto/salon.dto';
import { AddressDto } from './dto/address.dto';
import { FilterDto } from './dto/filter.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('saloons')
@Controller('saloons')
export class SalonController {
    constructor(private readonly salonService: SalonService) {}

    @UsePipes(new ValidationPipe())
    @Get()
    async getAll(@Query('searchTerm') searchTerm?: string){
        return this.salonService.getAll(searchTerm)
    }

    @Get('by-id/:id')
    async getSalonById(@Param('id') id: string){
        return this.salonService.byId(id)
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('/around-you')
    async filter(@Body() dto: FilterDto){
        return this.salonService.filter(dto)
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post()
    async createSalon(@Body() dto: CreateSalonDto){
        return this.salonService.create(dto)
    }  

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Put(':id')
    async updateSalon(@Param('id') id: string, @Body() salonDto:UpdateSalonDto,@Body() addressDto: AddressDto) {
        return this.salonService.update(id, salonDto, addressDto)
    }

    @HttpCode(200)
	@Delete(':id')
	async deleteProduct(@Param('id') id: string) {
		return this.salonService.delete(id)
	}

}
