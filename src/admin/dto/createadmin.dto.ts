import { IsEmail, IsString } from "class-validator";

export class RegisterDto{
    @IsString()
     username: string;
     
    @IsString()
    password: string;
    
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    firstName: string;
    
    @IsString()
    lastName: string;
    

}