import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entity/product.entity';
import { Review } from 'src/entity/review.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ReviewService {

    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}


}
