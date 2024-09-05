import { MessageEntity } from "src/messages/messages.entity";
import { QuizEntity } from "src/quiz/Quiz.entity";
import { UsersEntity } from "src/users/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("admintable")

export class AdminEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    role: string;
    @Column()
    email: string;
    @Column()
    firstname: string;
    @Column()
    lastname: string;
    @OneToMany(()=>MessageEntity, message=>message.admin)
    messages:MessageEntity[]
    @OneToMany(()=>UsersEntity, user=>user.admin)
    users:UsersEntity[]
    @OneToMany(() => QuizEntity, quiz => quiz.admin)
    quiz: QuizEntity[]

}