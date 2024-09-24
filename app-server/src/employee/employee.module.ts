import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { PrismaService } from 'src/prisma.service';
import { EmployeeService } from './employee.service';

@Module({
  controllers: [EmployeeController],
  providers:[PrismaService, EmployeeService]
})
export class EmployeeModule {}
