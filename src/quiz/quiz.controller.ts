// src/quiz/quiz.controller.ts
import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './Dto/createquiz.dto';
import { Quiz } from './Quiz.entity';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  // Route pour créer un nouveau quiz
  async createQuiz(@Body() createQuizDto: CreateQuizDto): Promise<Quiz> {
    return await this.quizService.createQuiz(createQuizDto);
  }

  @Get()
  // Route pour récupérer tous les quiz
  async getAllQuizzes(): Promise<Quiz[]> {
    return await this.quizService.getAllQuizzes();
  }

  @Get(':id')
  // Route pour récupérer un quiz spécifique par son identifiant
  async getQuizById(@Param('id') id: number): Promise<Quiz> {
    return await this.quizService.getQuizById(id);
  }

  @Put(':id')
  // Route pour mettre à jour un quiz existant
  async updateQuiz(@Param('id') id: number, @Body() updateQuizDto: CreateQuizDto): Promise<Quiz> {
    return await this.quizService.updateQuiz(id, updateQuizDto);
  }

  @Delete(':id')
  // Route pour supprimer un quiz par son identifiant
  async deleteQuiz(@Param('id') id: number): Promise<void> {
    return await this.quizService.deleteQuiz(id);
  }
}
