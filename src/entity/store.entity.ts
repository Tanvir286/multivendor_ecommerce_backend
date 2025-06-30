
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

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

}