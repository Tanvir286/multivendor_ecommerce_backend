import { Body, Controller, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {

    
    constructor(private readonly categoryService:CategoryService){}

    /*🏳️<===============(Create Category Start)===============>🏳️ */
    @Post('createcategory')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth() 
    @ApiOperation({ summary: 'Create a new category' })
    @ApiResponse({ status: 201, description: 'Category created successfully.' })
    @ApiResponse({ status: 400, description: 'Bad Request. Invalid data.' })
    @ApiResponse({ status: 401, description: 'Unauthorized. No token or invalid token.' })
    async create(@Body() createCategoryDto: CreateCategoryDto, @Request() req: any) {
      const ownerId = req.user.id;
      return this.categoryService.createCategory(createCategoryDto, ownerId);
    }
    /*🚩<===============(Create Category End)===============>🚩 */

    /*🏳️<===============(Update Category Start)===============>🏳️ */

    @Put('updateCategory/:id')
    @UseGuards(JwtAuthGuard)   
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update an existing category' })     
    @ApiResponse({ status: 200, description: 'Category updated successfully.' })
    @ApiResponse({ status: 404, description: 'Category not found.' }) 
    @ApiResponse({ status: 403, description: 'Access denied. Only owner can update.' })
    async updateCategory(@Param('id') id: string, @Body() updateCategoryDto: CreateCategoryDto, @Request() req: any) {
        const ownerId = req.user.id;
        return this.categoryService.updateCategory(+id, updateCategoryDto, ownerId);
    }
    /*🚩<===============(Update Category End)===============>🚩 */

    







     









}
