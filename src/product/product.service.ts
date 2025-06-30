
import { Injectable, ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entity/product.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Store } from 'src/entity/store.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

     @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) {}

    /*<========================================>
         🏳️   Create Product  Start    🏳️
    ===========================================>*/

    async createProduct(
        userId: number ,
        createProductDto: CreateProductDto,
        imagePath?: string ,
    ): 
    Promise<{ message: string; product?: Product }> {

    const { name, description, price, stock, storeId } = createProductDto; 
    
    // user kuja hoitase
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
        throw new NotFoundException(`User ${userId} not found.`);
    }

    // store kuja hoitase
    const store = await this.storeRepository.findOne({ where: { id: storeId, owner: { id: userId } } });
    if (!store) { 
        throw new NotFoundException(`Store ${storeId} not found.`);
    }

    const product = this.productRepository.create({
                    ...createProductDto,
                    imageUrl: imagePath,
                    vendor: user,
                    store: store,
                });

    try {
        const savedProduct = await this.productRepository.save(product);
        return {
                message: 'Product created successfully.',
                product: savedProduct,
        };
    } catch (error) {
    if (error.code === '23505') {
        throw new ConflictException('Product with this name already exists.');
    }
     throw new InternalServerErrorException('Failed to create product.');
     }
    }

    /*<========================================>
       🚩       Create Product End        🚩
    ===========================================>*/

    /*<========================================>
          🏳️   get A Single Product  Start    🏳️
    ===========================================>*/
    async getProductById(id:number): Promise<Product> {
    
            const product = await this.productRepository.findOne({ where: { id: Number(id) } });
            if (!product) {
                throw new NotFoundException(`Product ${id} not found.`);
            }
            return product;
     
    }
    /*<========================================>
       🚩      get A Single Product End     🚩
    ===========================================>*/


    /*<========================================>
         🏳️   get All Product  Start    🏳️
    ===========================================>*/
    async getAllProduct(): Promise<Product[]> {
      return this.productRepository.find({relations: ['vendor', 'store']});
    }

    /*<========================================>
       🚩      get All Product End        🚩
    ===========================================>*/


    /*<========================================>
       🏳️  Update A Single Product  Start  🏳️
    ===========================================>*/
    async updateProduct(
       id: number,
       updateProductDto: UpdateProductDto,
       imagePath?: string,
    ): Promise<Product> {
    
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
        throw new NotFoundException(`Product ${id} not found.`);
    }

    Object.assign(product, updateProductDto);

    if (imagePath) {
        product.imageUrl = imagePath;
    }

    return this.productRepository.save(product);
    }

    /*<========================================>
       🚩      Update A Single Product End     🚩
    ===========================================>*/
    

    /*<========================================>
       🏳️  Delete A Single Product  Start  🏳️
    ===========================================>*/
  
    async deleteProduct(id: number): Promise<{ message: string }> {
        
        const product = await this.productRepository.findOne({ where: { id: Number(id) } });
        
        if (!product) {
            throw new NotFoundException(`Product ${id} not found.`);
        }
        
        await this.productRepository.remove(product);
        return { message: `Product ${id} deleted successfully.` };
    }

    /*<========================================>
       🚩      Delete A Single Product End     🚩
    ===========================================>*/


}

