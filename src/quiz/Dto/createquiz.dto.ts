// src/quiz/dto/create-quiz.dto.ts
import { IsBoolean, IsString } from 'class-validator';

export class CreateQuizDto {
  @IsString()
  // Valide si le champ 'question' est une chaîne de caractères
  question: string;

  @IsString()
  // Valide si le champ 'response' est un booléen
  response: string;

  @IsString()
  // Valide si le champ 'category' est une chaîne de caractères
  category: string;
}
