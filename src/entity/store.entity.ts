
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity()
export class Store {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
   storeName: string; // changed from name

  @Column()
  storeDescription: string; // changed from description

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.stores)
  storeOwner: User; // changed from owner


  // new added
  @OneToMany(() => Product, (product) => product.store)
  products: Product[];

}