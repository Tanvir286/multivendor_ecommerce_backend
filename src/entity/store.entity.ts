import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

Entity()
export class Store {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    description: string;

    @Column()
    location: string;

    @Column({ nullable: true })
    image: string; 

    @ManyToOne (() => User, (user) => user.stores)
    owner: User;

    @CreateDateColumn()
    createdAt: Date;

}