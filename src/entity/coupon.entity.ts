import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Store } from "./store.entity";


export enum DiscountType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED',
}

export enum ScopeType {
  PRODUCT = "PRODUCT",
  CATEGORY = "CATEGORY",
  STORE = "STORE",
}


@Entity()
export class Coupon {   

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ unique: true })
    couponCode: string;

    @Column({ type: 'enum', enum: ['FIXED','PERCENTAGE'] })
    discountType: 'FIXED' | 'PERCENTAGE' ;

    @Column('decimal')
    discountAmount: number;

    @Column({ type: 'enum', enum: ['PRODUCT','CATEGORY','FLAT'] })
    scope: 'PRODUCT' | 'CATEGORY' | 'FLAT' ;

    //============================================
    @Column({ nullable: true })
    productId?: number;
  
    @Column({ nullable: true })
    categoryId?: number;
    //============================================

    @Column({type: 'timestamp', nullable: true})
    expireAt?: Date;

    @CreateDateColumn()
    createdAt: Date;

    // Assuming Coupon can be associated with a Store
    @ManyToOne(() => Store, store => store.coupons)
    store: Store;

}