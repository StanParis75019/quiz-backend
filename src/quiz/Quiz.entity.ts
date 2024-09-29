// src/quiz/quiz.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('quizzes')
export class Quiz {
  @PrimaryGeneratedColumn()
  // Colonne pour la clé primaire générée automatiquement
  id: number;

  @Column()
  // Colonne pour stocker la question du quiz
  question: string;

  @Column({ default: false })
  // Colonne pour stocker la réponse (booléenne) du quiz, avec une valeur par défaut à 'false'
  response: boolean;

  @Column()
  // Colonne pour stocker la catégorie du quiz
  category: string;
}
