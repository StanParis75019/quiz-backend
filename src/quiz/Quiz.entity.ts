// src/quiz/quiz.entity.ts

import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity('quizzes')
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  response: string;

  @Column()
  category: string;

  @ManyToMany(() => User, (user) => user.quizzes, { cascade: ['remove'] }) // Enable cascade delete
  users: User[]; // Inverse relationship with User
}
