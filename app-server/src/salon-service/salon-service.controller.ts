
import { ApiTags } from '@nestjs/swagger';
import { CreateSalonServiceDto, UpdateSalonServiceDto } from './dto/salon-service.dto';
import { SalonServiceService } from './salon-service.service';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';

@ApiTags('salon-services')
@Controller('salon-services')
export class SalonServiceController {
    constructor(private readonly salonServiceService: SalonServiceService){}
   
    @UsePipes(new ValidationPipe())
    @Get('by-salon/salon')
    async getBySalon(@Query('id') id: string){
        return this.salonServiceService.bySalon(id)
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post()
    async createSalonService(@Body() dto:CreateSalonServiceDto){
        return this.salonServiceService.create(dto)
    }

    @UsePipes(new ValidationPipe()) 
	@HttpCode(200)
	@Put(':id')
    async updateSalonService(@Param('id') id:string, @Body() dto:UpdateSalonServiceDto){
        return this.salonServiceService.update(id, dto)
    }

    @HttpCode(200)
	@Delete(':id')
    async deleteSalonService(@Param('id') id:string){
        return this.salonServiceService.delete(id)
    }
}
