import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from 'src/entity/store.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoreService {

  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}


   /*<========================================>
         🏳️   Create Store Start    🏳️
   ===========================================>*/
   
    async create(createStoreDto: CreateStoreDto,userId: number ): Promise<Store> {
 
        const { storeName, storeDescription } = createStoreDto;

        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const existingStore = await this.storeRepository.findOne({ where: { storeName } });
        if (existingStore) {
            throw new NotFoundException('Store with this name already exists');
        }

        const store = this.storeRepository.create({
            storeName,
            storeDescription,
            storeOwner: user,
        });
        return this.storeRepository.save(store);
    }

    /*<========================================>
       🚩       Create Store End        🚩
    ===========================================>*/

     /*<========================================>
         🏳️  Get All Create Store Start    🏳️
    ===========================================>*/
    async getStoresByUser(userId: number): Promise<Store[]> {
        return this.storeRepository.find({
            where: { storeOwner: { id: userId } },
            relations: ['storeOwner'],});
    }
    /*<========================================>
       🚩      Get All Create Store End     🚩
    ===========================================>*/


   /*<========================================>
         🏳️  Get Single Store By ID Start    🏳️
    ===========================================>*/
 
    async getStoreById(id: number, userId: number): Promise<Store> {
        const store = await this.storeRepository.findOne({
            where: { id },
            relations: ['storeOwner'],
        });

        if (!store) {
            throw new NotFoundException('Store not found');
        }

        if (store.storeOwner.id !== userId) {
            throw new NotFoundException('You do not have access to this store');
        }
     return store;
    }

    /*<========================================>
       🚩      Get Single Store By ID End     🚩
    ===========================================>*/

    /*<========================================>
         🏳️  Delete Store By ID Start    🏳️
    ===========================================>*/
   
   async deleteStoreById(storeId: number, userId: number): Promise<{ message: string }> {
    
    const store = await this.storeRepository.findOne({
        where: { id: storeId },
        relations: ['storeOwner'], 
    });

    if (!store) {
        throw new NotFoundException('Store not found');
    }

    if (store.storeOwner.id !== userId) {
        throw new ForbiddenException('You do not have access to delete this store');
    }

    await this.storeRepository.remove(store);

    return { message: 'Store deleted successfully' };
    
   }

   /*<========================================>
       🚩  Delete Store By ID End    🚩
   ===========================================>*/
   /*<========================================>
         🏳️  Update Store By ID Start    🏳️
    ===========================================>*/

    async updateStoreById(storeId: number, updateStoreDto: UpdateStoreDto, userId: number): 
       Promise<{ message: string; store: Store }> {
        const store = await this.storeRepository.findOne({
            where: { id: storeId },
            relations: ['storeOwner'],
        });

    if (!store) {
        throw new NotFoundException('Store not found');
    }

    if (store.storeOwner.id !== userId) {
        throw new ForbiddenException('You do not have access to update this store');
    }

    Object.assign(store, updateStoreDto);

    const updated = await this.storeRepository.save(store);


    return {
        message: 'Store updated successfully',
        store: updated,
    };

    }
  
    /*<========================================>
         🚩  Update Store By ID End    🚩
    ===========================================>*/

 





}
