import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {

    
    constructor(private readonly categoryService:CategoryService){}

    @Post('createcategory')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth() 
    @ApiOperation({ summary: 'Create a new category' })
    @ApiResponse({ status: 201, description: 'Category created successfully.' })
    @ApiResponse({ status: 400, description: 'Bad Request. Invalid data.' })
    @ApiResponse({ status: 401, description: 'Unauthorized. No token or invalid token.' })
    async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
      return this.categoryService.createCategory(createCategoryDto);
    }




}
