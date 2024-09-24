import { Module } from '@nestjs/common';
import { SalonService } from './salon.service';
import { SalonController } from './salon.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [SalonService, PrismaService],
  controllers: [SalonController]
})
export class SalonModule {}
