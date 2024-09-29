import { IsEmail, IsString } from "class-validator";

export class RegisterDto {
    @IsString()
    // Valide si le champ 'username' est une chaîne de caractères
    username: string;
     
    @IsString()
    // Valide si le champ 'password' est une chaîne de caractères
    password: string;
    
    @IsString()
    @IsEmail()
    // Valide si le champ 'email' est une chaîne de caractères et une adresse email valide
    email: string;

    @IsString()
    // Valide si le champ 'firstName' est une chaîne de caractères
    firstName: string;
    
    @IsString()
    // Valide si le champ 'lastName' est une chaîne de caractères
    lastName: string;
}
