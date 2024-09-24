import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto, UpdateCouponDto } from './dto/coupon.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('coupons')
@Controller('coupons')
export class CouponController {
    constructor(private readonly couponService: CouponService){}

    @UsePipes(new ValidationPipe())
    @Get('by-salon/salon')
    async getBySalon(@Query('id') id: string){
        return this.couponService.bySalon(id)
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post()
    async createCoupon(@Body() dto: CreateCouponDto){
        return this.couponService.create(dto)
    }

    @UsePipes(new ValidationPipe()) 
	@HttpCode(200)
	@Put(':id')
    async updateCoupon(@Param('id') id:string, @Body() dto: UpdateCouponDto){
        return this.couponService.update(id, dto)
    }

    @HttpCode(200)
	@Delete(':id')
    async deleteCoupon(@Param('id') id:string){
        return this.couponService.delete(id)
    }
}
