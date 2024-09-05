import { IsEmail, IsString } from "class-validator";

export class CreateMessageDto{
    @IsEmail()
    @IsString()
    email:string
    @IsString()
    telephone : string;
    @IsString()
    message:string;
    @IsString()
    nom: string;
}