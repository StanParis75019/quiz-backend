import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { QuizModule } from "src/quiz/quiz.module";
import { Quiz } from "src/quiz/Quiz.entity";

@Module({
    // Importe le module TypeOrmModule avec l'entité 'User' pour permettre les opérations sur la base de données
    imports: [TypeOrmModule.forFeature([User,Quiz]),QuizModule],
    
    // Spécifie le contrôleur 'UserController' pour gérer les routes liées aux utilisateurs
    controllers: [UserController],
    
    // Spécifie le service 'UserService' comme fournisseur dans ce module
    providers: [UserService],
    
    // Déclare les éléments exportés par ce module (vide ici, mais pourrait contenir des services ou des modules à partager)
    exports: [],
})
export class UsersModule {}
