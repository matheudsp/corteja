import {
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe,
	Delete,
	Param
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger';
import { AppointmentService } from './appointment.service';
import { CreateAppoitmentDto } from './dto/appointment.dto';
import { AppointmentFilterDto } from './dto/appointment-filter.dto';
import { AppointmentVerifyDto } from './dto/appointment-verify';

@ApiTags('appointments')
@Controller('appointments')
export class AppointmentController {
	constructor(private readonly appointmentService: AppointmentService){}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	async createAppointment(@Body() dto:CreateAppoitmentDto){
		return this.appointmentService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('/filter')
	async filterAppointment(@Body() dto: AppointmentFilterDto){
		return this.appointmentService.filter(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('/verify')
	async verifyDisponibility(@Body() dto: AppointmentVerifyDto){
		return this.appointmentService.getDays(dto)
	}

	@HttpCode(200)
	@Delete(':id')
	async deleteAppointment(@Param('id') id:string){
		return this.appointmentService.delete(id)
	}

}