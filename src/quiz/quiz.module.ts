// src/quiz/quiz.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './Quiz.entity';
import { Category } from 'src/categorie/categorie.entity';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';

@Module({
  // Importe le module TypeOrmModule avec les entités Quiz et Category pour permettre les opérations sur la base de données
  imports: [TypeOrmModule.forFeature([Quiz, Category])],
  
  // Spécifie le service 'QuizService' comme fournisseur dans ce module
  providers: [QuizService],
  
  // Spécifie le contrôleur 'QuizController' pour gérer les routes liées aux quiz
  controllers: [QuizController],
})
export class QuizModule {}
