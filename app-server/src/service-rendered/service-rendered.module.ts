import { Module } from '@nestjs/common';
import { ServiceRenderedController } from './service-rendered.controller';
import { ServiceRenderedService } from './service-rendered.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    controllers:[ServiceRenderedController],
    providers:[ServiceRenderedService, PrismaService]
})
export class ServiceRenderedModule {}
