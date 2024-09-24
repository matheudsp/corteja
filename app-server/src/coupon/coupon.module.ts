import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { PrismaService } from 'src/prisma.service';
import { CouponService } from './coupon.service';

@Module({
    controllers: [CouponController],
    providers:[PrismaService, CouponService],
    
})
export class CouponModule {}
