import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MessageEntity } from "./messages.entity";
import { CreateMessageDto } from "./Dto/CreateMessage.dto";

@Injectable()
export class MessageService{
    constructor(
        @InjectRepository(MessageEntity) 
        private readonly messagerepo:Repository<MessageEntity>
    ){} 
    async createMessage(data:CreateMessageDto)
    {
        const newMessage = this.messagerepo.create({
            email: data.email,
            nom: data.nom,
            telephone: data.telephone,
            message: data.message

        })
        if (! newMessage){
            throw new HttpException("Le message n'a pas été créé", HttpStatus.CONFLICT)
        }
        return await this.messagerepo.save(newMessage)

    }
async GetAllMessage(){
    const data = await this.messagerepo.find();
    if (!data){
        throw new HttpException("Pas de message jusqu'à maintenant", HttpStatus.NOT_FOUND)
    }
    return data 
}
async DeleteMessage(id:number){
    const isMessageFound = await this.messagerepo.findOne({where: {id}})
    if (! isMessageFound){
        throw new HttpException("Aucun message avec cet id", HttpStatus.NOT_FOUND)

    }
    return await this.messagerepo.delete(isMessageFound)
}
async GetmessageById(id: number){
    const message = await this.messagerepo.findOne({where:{id}})
    if (!message){
        throw new HttpException("Aucun message avec cet id", HttpStatus.NOT_FOUND)
    }
    return message;
}
}