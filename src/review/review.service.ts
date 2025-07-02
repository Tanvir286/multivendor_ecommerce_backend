import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entity/product.entity';
import { Review } from 'src/entity/review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { User } from 'src/entity/user.entity';


@Injectable()
export class ReviewService {

    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}


    /*<========================================>
      🏳️      create Review Part Start     🏳️
    ===========================================>*/
    async createReview(createReviewDto: CreateReviewDto, userId: number): Promise<any> {

        const { productId , ...reviewData} = createReviewDto;

        const user = await this.userRepository.findOne({ where: { id: userId } });
        console.log(user);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const product = await this.productRepository.findOne({ where: { id: productId } });
        console.log(product);
        if (!product) {
            throw new NotFoundException('Product not found');
        }


        const review = this.reviewRepository.create({ 
            ...reviewData,
            user,
            product
        });
        return this.reviewRepository.save(review);
    }



    /*<========================================>
      🚩      create Review Part End       🚩
    ===========================================>*/

}
