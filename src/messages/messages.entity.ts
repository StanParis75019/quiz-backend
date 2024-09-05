import { AdminEntity } from "src/admin/admin.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MessageEntity{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    email: string;
    @Column()
    nom: string;
    @Column()
    telephone: string;
    @Column()
    message: string;
    @ManyToOne(()=> AdminEntity, admin =>admin.messages)
    admin: AdminEntity
}