
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';
import { Coupon } from './coupon.entity';

@Entity()
export class Store {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  storeName: string;
   
  @Column()
  storeDescription: string; 

  @CreateDateColumn()
  createdAt: Date;

  // Store onwername add
  @ManyToOne(() => User, (user) => user.stores)
  @JoinColumn({ name: 'storeOwnerId' }) 
  storeOwner: User;

  // Assuming Store can have multiple products
  @OneToMany(() => Product, (product) => product.store)
  products: Product[];
 
  // Assuming Store can have multiple coupons
  @OneToMany(() => Coupon, (coupon) => coupon.store)
  coupons: Coupon[];

}

