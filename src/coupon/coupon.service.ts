import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
   
        // coupon ase kina
        const existingCoupon = await this.couponRepository.findOne({where: { couponCode }})
        if(existingCoupon){
             throw new BadRequestException(`Coupon already exists`);
        }

        // more check
        if(scope === "PRODUCT" && productId){
            const product =  await this.productRepository.findOne({where:{id:productId, store:{id: storeId }}})
            if(!product){
              throw new NotFoundException('Product not found or does not belong to this store') 
            }
        }else if(scope === 'CATEGORY' && categoryId ){
            const category =  await this.categoryRepository.findOne({where:{id:categoryId}})
            if(!category){
              throw new NotFoundException('category not found') 
            }
        }else if(scope === 'FLAT'){

            if(productId || categoryId){
              throw new BadRequestException('FLAT coupons do not require productId or CategoryId please remove it') 
            }
        }else{
             throw new BadRequestException('Invalid Scope or missing require field') 
        }
        

        // percentage check
        if(discountType === 'PERCENTAGE' && (discountAmount < 1 || discountAmount > 100)){
            throw new BadRequestException('Percentage disount must be between 1 and 100')
        }else if(discountType === 'FIXED' && discountAmount <= 0){
            throw new BadRequestException('Fixed discount must be greater than 0')
        }


        // save db
        const coupon =  this.couponRepository.create({
            couponCode, 
            discountType, 
            discountAmount,
            scope,
            store, 
            productId, 
            categoryId,
            expireAt: expireAt ? new Date(expireAt): undefined

        } )
          



        return await this.couponRepository.save(coupon);}




}
