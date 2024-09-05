import { AdminEntity } from "src/admin/admin.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UsersEntity{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    email: string;
    @Column()
    username: string;
    @Column()
    nom: string;
    @Column()
    prenom: string;
    @Column()
    password: string;
    @Column()
    score: number;
    @Column({default:"USER"})
    role: string;
    @ManyToOne(()=> AdminEntity, admin =>admin.users)
    admin: AdminEntity
}