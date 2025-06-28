import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { JwtAuthGuard } from 'src/jwt-auth.guard';

@ApiTags('Store')
@Controller('store')
export class StoreController {

  constructor(private readonly storeService: StoreService) {}


  /*🏳️<===============(Create Store Start)===============>🏳️ */
  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new store' })
  @ApiResponse({ status: 201, description: 'Store created successfully.'})  
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createStore(@Body() createStoreDto: CreateStoreDto, @Request() req) {
    return this.storeService.create(createStoreDto, req.user.id);
  }
  /*🚩<===============(Create Store End)===============>🚩 */


  /*🏳️<===============(Get All Stores Start)===============>🏳️ */
  @Post('getAll')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all stores' })
  @ApiResponse({ status: 200, description: 'Stores retrieved successfully.'}) 
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getAllStores() {
    return this.storeService.getAllStores();
  }
  /*🚩<===============(Get All Stores End)===============>🚩 */


}

 