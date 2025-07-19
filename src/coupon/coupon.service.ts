import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entity/catagory.entity';
import { Coupon } from 'src/entity/coupon.entity';
import { Product } from 'src/entity/product.entity';
import { Store } from 'src/entity/store.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
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

    async create(createCouponDto: CreateCouponDto, userId: number): Promise<any> {

        const { couponCode, 
                discountType, 
                discountAmount,
                storeId, 
                productId, 
                categoryId,
                expireAt } = createCouponDto;
            

        // Check if the user exists
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }

        // Check if the store exists and belongs to the user
        const store = await this.storeRepository.findOne({ where: { id: storeId, storeOwner: { id: userId } } });
        if (!store) {
            throw new Error(`Store with ID ${storeId} not found or does not belong to user ${userId}`);
        }

        // Create a new coupon
        const coupon = this.couponRepository.create({
            ...createCouponDto,
            store,
            productId,
            categoryId,
        });

        return this.couponRepository.save(coupon);
    }






















}
