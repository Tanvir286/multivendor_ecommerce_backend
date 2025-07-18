import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CouponService } from './coupon.service';
import { JwtAuthGuard } from 'src/jwt-auth.guard';

@ApiTags('coupon')
@Controller('coupon')
export class CouponController {


    constructor(private readonly couponService: CouponService) {}

    @Post('create')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()






}
