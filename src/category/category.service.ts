import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entity/catagory.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {

   constructor(
       @InjectRepository(Category)
       private readonly categoryRepository: Repository<Category>,
      //  @InjectRepository(Product)
      //  private readonly userRepository: Repository<User>,
     ) {}


    /*<========================================>
           🏳️   Create Category Start    🏳️
    ===========================================>*/ 
    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {

      const { categoryName, categoryDescription } = createCategoryDto;

     
      const existing = await this.categoryRepository.findOne({ where: { categoryName } });
      if (existing) {
          throw new ConflictException('Category with this name already exists');
        }

      const category = this.categoryRepository.create({
        categoryName,
        categoryDescription,
      });

      return await this.categoryRepository.save(category);
    }
    /*<========================================>
       🚩       Create Category End        🚩
    ===========================================>*/
  










}
