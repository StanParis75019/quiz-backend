// src/quiz/quiz.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './Quiz.entity';
import { CreateQuizDto } from './Dto/createquiz.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    // Injection du repository de l'entité 'Quiz' pour interagir avec la base de données
    private readonly quizRepository: Repository<Quiz>,
    @InjectRepository(User) // Inject the User repository
    private readonly userRepository: Repository<User>,
  ) {}

  // Méthode pour créer un nouveau quiz
  async createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const quiz = this.quizRepository.create(createQuizDto);
    return await this.quizRepository.save(quiz);
  }

  // Méthode pour récupérer tous les quiz
  async getAllQuizzes(): Promise<Quiz[]> {
    return await this.quizRepository.find();
  }

  // Méthode pour récupérer un quiz par son identifiant
  async getQuizById(id: number): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne({ where: { id } });
    if (!quiz) {
      // Lance une exception si le quiz n'est pas trouvé
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }
    return quiz;
  }

  // Méthode pour mettre à jour un quiz existant
  async updateQuiz(id: number, updateQuizDto: CreateQuizDto): Promise<Quiz> {
    const quiz = await this.getQuizById(id); // Récupère le quiz à mettre à jour
    Object.assign(quiz, updateQuizDto); // Met à jour le quiz avec les nouvelles données
    return await this.quizRepository.save(quiz);
  }

  // Méthode pour supprimer un quiz par son identifiant
  async deleteQuiz(id: number): Promise<void> {
    const quiz = await this.quizRepository.findOne({ where: { id } });
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    // Remove all associations between this quiz and users before deleting the quiz
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'quizzes')
      .of(quiz) // Target the quiz
      .remove(quiz.users); // Remove the relation with users

    // Now you can safely delete the quiz
    await this.quizRepository.remove(quiz);
  }

}
