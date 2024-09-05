import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { QuizService } from "./quiz.service";
import { Createquizdto } from "./Dto/createquiz.dto";
import { Updatequizdto } from "./Dto/updatequiz.dto";

@Controller("quiz")
export class QuizController{
    constructor(
        private readonly quizservice: QuizService
    ){}
    @Post('/create')
    async CreateQuiz (@Body() data: Createquizdto){
        return await this.quizservice.createquiz(data)
    }
    @Get("/getallquiz")
    async GetAllData(){
        return await this.quizservice.GetAllQuiz()
    }
    @Delete ('/delete/:id')
    async DeleteQuiz(@Param("id") id:number){
        return await this.quizservice.DeleteQuiz(id)
    }
    @Put ('/updatequiz/:id')
    async UpdateQuiz(@Param('id') id: number, @Body() data:Updatequizdto ){
        return await this.quizservice.UpdateQuiz(id, data)
    }
    @Get ("/getquizbyid/:id")
    async GetQuizbyId ( @Param('id') id: number){
        return await this.quizservice.GetQuizbyId(id)
    }
}