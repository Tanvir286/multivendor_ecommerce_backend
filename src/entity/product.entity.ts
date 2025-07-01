

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Store } from './store.entity';

@Entity()
export class Product {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  productName: string;

  @Column()
  productDescription: string;

  @Column()
  productPrice: number;

  @Column()
  productStock: number;

  @Column({ nullable: true }) // allow null for optional image
  productImageUrl: string;

  @ManyToOne(() => User, (user) => user.id)
  vendor: User;

  @ManyToOne(()=> Store, (store) => store.id)
  store:Store

}