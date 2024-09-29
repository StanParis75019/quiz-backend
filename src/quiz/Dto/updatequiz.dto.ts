export class UpdateQuizDto {
  // Champ facultatif pour le titre du quiz
  readonly title?: string;

  // Champ facultatif pour la description du quiz
  readonly description?: string;

  // Tableau de questions, chaque élément contient une question et une réponse (booléenne)
  readonly questions: { question: string; answer: boolean }[];
}
