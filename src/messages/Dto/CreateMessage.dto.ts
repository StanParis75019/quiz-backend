import { IsString } from "class-validator";

export class CreateMessageDto {
    
    @IsString()
    // Valide si le champ 'senderName' est une chaîne de caractères
    senderName: string;
    
    @IsString()
    // Valide si le champ 'email' est une chaîne de caractères
    email: string;
    
    @IsString()
    // Valide si le champ 'messageBody' est une chaîne de caractères
    messageBody: string;
}
