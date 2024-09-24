import { Module } from '@nestjs/common';
import { SalonServiceController } from './salon-service.controller';
import { SalonServiceService } from './salon-service.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    controllers:[SalonServiceController],
    providers:[SalonServiceService, PrismaService]
})
export class SalonServiceModule {}
