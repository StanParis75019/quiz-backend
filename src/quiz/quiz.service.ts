import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QuizEntity } from "./Quiz.entity";
import { Repository } from "typeorm";
import { Createquizdto } from "./Dto/createquiz.dto";
import { Updatequizdto } from "./Dto/updatequiz.dto";

@Injectable()
export class QuizService{
    constructor(
        @InjectRepository(QuizEntity)
        private readonly quizrepository : Repository<QuizEntity>

    ){}
    async createquiz(data: Createquizdto){
        const NewQuiz = this.quizrepository.create({
            Question : data.Question,
            Reponse : data.Reponse,
            Categorie : data.Categorie,

        })
        return await this.quizrepository.save(NewQuiz);
    }
    async GetAllQuiz (){
        const data = await this.quizrepository.find({})
        if ( ! data){
            throw new HttpException('Aucune donnée', HttpStatus.NOT_FOUND)
        }
        return data
    }
    async DeleteQuiz(id: number){
        const isfound = await this.quizrepository.findOne({where:{id}})
        if ( ! isfound){ throw new HttpException("Aucun qui n'a été trouvé par cet id", HttpStatus.NOT_FOUND)}
        return await this.quizrepository.delete(isfound);
    }
    async UpdateQuiz(id : number, data : Updatequizdto){
        const isfound = await this.quizrepository.findOne({where:{id}})
        if ( ! isfound){ throw new HttpException("Aucun qui n'a été trouvé par cet id", HttpStatus.NOT_FOUND)}
        Object.assign(isfound, data)
        return await this.quizrepository.save(isfound)
    }
    async GetQuizbyId(id: number){
        const isfound = await this.quizrepository.findOne({where:{id}})
        if ( ! isfound){ throw new HttpException("Aucun qui n'a été trouvé par cet id", HttpStatus.NOT_FOUND)}
        return isfound;
    }
}