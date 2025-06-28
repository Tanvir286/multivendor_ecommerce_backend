import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Store } from 'src/entity/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Store,User])], // Add your Store entity here if needed
  controllers: [StoreController],
  providers: [StoreService]
})
export class StoreModule {}
