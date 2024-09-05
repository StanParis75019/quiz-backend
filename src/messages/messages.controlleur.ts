import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { MessageService } from "./messages.service";
import { CreateMessageDto } from "./Dto/CreateMessage.dto";

@Controller("message")
export class MessageController{
    constructor(private readonly messageService: MessageService){}
    @Post("/createmessage")
    async createMessage(@Body() data: CreateMessageDto){
        return await this.messageService.createMessage(data)
    }

    @Get('/getallmessage')
    async getallmessage(){
        return await this.messageService.GetAllMessage()
    }
    @Delete('/deletemessage/:id')
    async deletemessage(@Param("id") id:number){
        return await this.messageService.DeleteMessage(id)
    }
    @Get('/getmessagebyid/:id')
    async getmessagebyid(@Param("id") id:number){
        return await this.messageService.GetmessageById(id)
    }
}
