import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto/employee.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('employees')
@Controller('employees')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService){}

    @UsePipes(new ValidationPipe())
    @Get('by-salon/salon')
    async getBySalon(@Query('id') id: string){
        return this.employeeService.bySalon(id)
    }


    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post()
    async createEmployee(@Body() dto: CreateEmployeeDto){
        return this.employeeService.create(dto)
    }

    @UsePipes(new ValidationPipe()) 
	@HttpCode(200)
	@Put(':id')
    async updateEmployee(@Param('id') id:string, @Body() dto: UpdateEmployeeDto){
        return this.employeeService.update(id, dto)
    }

    @HttpCode(200)
	@Delete(':id')
	async deleteEmployee(@Param('id') id: string) {
		return this.employeeService.delete(id)
	}

}   
