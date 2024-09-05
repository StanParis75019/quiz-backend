import { AdminEntity } from "src/admin/admin.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class QuizEntity{
    @PrimaryGeneratedColumn()
    id : number;
    @Column()
    Question : string;
    @Column()
    Reponse : string;
    @Column()
    Categorie : string;
    @ManyToOne(() => AdminEntity, (admin) => admin.quiz)
    admin:AdminEntity
}