import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from 'src/entity/store.entity';
import { User } from 'src/entity/user.entity';
import { CreateStoreDto } from './dto/create-store.dto';

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
   
   async create(createStoreDto: CreateStoreDto,userId: number): Promise<Store> {

        const user = await this.userRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new Error('User not found');
        }

        const store = this.storeRepository.create({
            ...createStoreDto,
            owner: user,
            createdAt: new Date(),
        });

        return this.storeRepository.save(store);
    }

    /*<========================================>
       🚩       Create Store End        🚩
    ===========================================>*/


    /*<========================================>
         🏳️  Get All Create Store Start    🏳️
    ===========================================>*/

    async getAllStores(): Promise<Store[]> {
       return this.storeRepository.find();
    }

    /*<========================================>
       🚩      Get All Create Store End     🚩
    ===========================================>*/

}
