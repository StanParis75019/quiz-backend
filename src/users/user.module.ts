import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersEntity } from "./user.entity";
import { UserController } from "./user.controller";
import { Userservice } from "./user.service";



@Module({
    imports:[TypeOrmModule.forFeature([UsersEntity])],
    controllers:[UserController],
    providers:[Userservice],
    exports:[],

})
export class UsersModule{}
