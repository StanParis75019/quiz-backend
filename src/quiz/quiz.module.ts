import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuizEntity } from "./Quiz.entity";
import { QuizController } from "./quiz.controller";
import { QuizService } from "./quiz.service";



@Module({
    imports:[TypeOrmModule.forFeature([QuizEntity])],
    controllers:[QuizController],
    providers:[QuizService],
    exports:[],

})
export class QuizModule{}
