
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

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

  @ManyToOne(() => User, (user) => user.stores)
  storeOwner: User; 


  @OneToMany(() => Product, (product) => product.store)
  products: Product[];

}