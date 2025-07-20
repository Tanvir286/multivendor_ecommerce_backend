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
                discountValue,
                scope,
                storeId, 
                productId, 
                categoryId,
                expireAt } = createCouponDto;
            

        // 1️⃣ Store ownership check
        const store = await this.storeRepository.findOne({ where: { id: storeId, storeOwner: { id: userId } } });
        if (!store) {
            throw new NotFoundException(`Store with ID ${storeId} not found or your are not onwer `);
        }
   
        // 2️⃣ Coupon Code uniqueness check
        const existingCoupon = await this.couponRepository.findOne({where: { couponCode }})

        if(existingCoupon){
             throw new BadRequestException(`Coupon already exists`);
        }

        // 3️⃣ Scope validation
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
        

        // 4️⃣ Discount type validation
        if(discountType === 'PERCENTAGE' && (discountValue < 1 || discountValue > 100)){
            throw new BadRequestException('Percentage disount must be between 1 and 100')
        }else if(discountType === 'FIXED' && discountValue <= 0){
            throw new BadRequestException('Fixed discount must be greater than 0')
        }


        // same product opr ar coupon na dawya
        if (scope === 'PRODUCT') {
        const existing = await this.couponRepository.findOne({ where: { productId, store: { id: storeId } } });
        if (existing) throw new BadRequestException('Coupon already exists for this product');
        }

        if (scope === 'CATEGORY') {
        const existing = await this.couponRepository.findOne({ where: { categoryId, store: { id: storeId } } });
        if (existing) throw new BadRequestException('Coupon already exists for this category');
        }

        
        // ata date na ager na hoi
        if (expireAt && new Date(expireAt) < new Date()) {
         throw new BadRequestException('Expire date must be in the future');
        }




        // 6️⃣ Create coupon
        const coupon = this.couponRepository.create({
            couponCode,
            discountType,
            discountValue,
            scope,
            store,
            productId,
            categoryId,
            expireAt: expireAt ? new Date(expireAt) : undefined
        });

        const savedCoupon = await this.couponRepository.save(coupon);
          
        return {
            message: "Coupon created successfully",
            data: savedCoupon
        }
    
    
    
    }


    /*<========================================>
       🚩       Create Coupon End        🚩
    ===========================================>*/

}
