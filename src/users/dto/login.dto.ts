import { IsEmail, IsString } from "class-validator";

export class LoginDto {
    @IsString()
    @IsEmail()
    // Valide si le champ 'email' est une chaîne de caractères et une adresse email valide
    email: string;
    
    @IsString()
    // Valide si le champ 'password' est une chaîne de caractères
    password: string;
}
