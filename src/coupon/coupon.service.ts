import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entity/catagory.entity';
import { Coupon } from 'src/entity/coupon.entity';
import { Product } from 'src/entity/product.entity';
import { Store } from 'src/entity/store.entity';
import { User } from 'src/entity/user.entity';
import { Not, Repository } from 'typeorm';
import { CreateCouponDto } from './dto/create-coupon.dto';

@Injectable()
export class CouponService {


    constructor(
        @InjectRepository(Coupon)
        private readonly couponRepository: Repository<Coupon>,

        @InjectRepository(Store)
        private readonly storeRepository: Repository<Store>,

        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,

        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

    ){}

    /*<========================================>
         🏳️   Create Coupon  Start    🏳️
    ===========================================>*/

    async create(createCouponDto: CreateCouponDto, userId: number): Promise<any> {

        const { couponCode, 
                discountType, 
                discountAmount,
                scope,
                storeId, 
                productId, 
                categoryId,
                expireAt } = createCouponDto;
            

        // Check if the store exists and belongs to the user
        const store = await this.storeRepository.findOne({ where: { id: storeId, storeOwner: { id: userId } } });
        if (!store) {
            throw new NotFoundException(`Store with ID ${storeId} not found or your are not onwer `);
        }

      
        return this.couponRepository.save(coupon);
    }






















}
