import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { PrismaService } from 'src/prisma.service';
import { AppointmentService } from './appointment.service';

@Module({
    controllers:[AppointmentController],
    providers:[PrismaService, AppointmentService]
})
export class AppointmentModule {}
