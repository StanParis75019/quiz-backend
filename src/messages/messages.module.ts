import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageEntity } from "./messages.entity";
import { MessageController } from "./messages.controlleur";
import { MessageService } from "./messages.service";


@Module({
    imports:[TypeOrmModule.forFeature([MessageEntity])],
    controllers:[MessageController],
    providers:[MessageService],
    exports:[],

})
export class MessageModule{}
