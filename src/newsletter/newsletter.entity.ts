import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class NewsletterEntity{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    email:string;
}