import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ServiceRenderedService } from './service-rendered.service';
import { CreateServiceRenderedDto, UpdateServiceRenderedDto } from './dto/service-rendered.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('services-rendered')
@Controller('services-rendered')
export class ServiceRenderedController {
    constructor(private readonly service: ServiceRenderedService) {}

    @UsePipes(new ValidationPipe())
    @Get('by-salon/salon')
    async getBySalon(@Query('id') id:string) {
        return this.service.bySalon(id)
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('/filter-by-service')
    async getByServiceRendered(@Body() serviceId:[]){
        return this.service.byService(serviceId)
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post()
    async createServiceRendered(@Body() dto:CreateServiceRenderedDto){
        return this.service.create(dto)
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Put(':id')
    async updateServiceRendered(@Param('id') id:string, @Body() dto: UpdateServiceRenderedDto){
        return this.service.update(id,dto)
    }

    @HttpCode(200)
    @Delete(':id')
    async deleteServiceRendered(@Param('id') id:string){
        return this.service.delete(id)
    }
}
