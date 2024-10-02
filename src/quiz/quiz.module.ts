// src/quiz/quiz.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './Quiz.entity';
import { Category } from 'src/categorie/categorie.entity';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { User } from 'src/users/user.entity';

@Module({
  // Importe le module TypeOrmModule avec les entités Quiz et Category pour permettre les opérations sur la base de données
  imports: [TypeOrmModule.forFeature([Quiz, Category,User])],
  
  // Spécifie le service 'QuizService' comme fournisseur dans ce module
  providers: [QuizService],
  
  // Spécifie le contrôleur 'QuizController' pour gérer les routes liées aux quiz
  controllers: [QuizController],
})
export class QuizModule {}
