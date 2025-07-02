import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { CreateReviewDto } from './dto/create-review.dto';

@ApiTags('Review')
@Controller('review')
export class ReviewController {

    constructor( private readonly reviewService: ReviewService) {}

    /*🏳️<===============(Create Review Start)===============>🏳️*/
    @Post('createreview')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new review for product' })
    @ApiResponse({ status: 201, description: 'Review created successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'Not Found.' })
    async createReview(@Body() createReviewDto: CreateReviewDto,@Request() req) {
        return this.reviewService.createReview(createReviewDto, req.user.id);
    }
    /*🚩<===============(Create Review End)===============>🚩*/

 





}
