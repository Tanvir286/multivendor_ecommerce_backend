

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Store } from './store.entity';
import { Review } from './review.entity';

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

  @ManyToOne(() => User, (user) => user.id)  // =product er
  vendor: User;

  @ManyToOne(()=> Store, (store) => store.id)  //= store er
  store:Store;


  // Review Part ata
  @OneToMany(() => Review, (review) => review.product)  //= store er
  reviews: Review[];

}