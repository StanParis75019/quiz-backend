import { IsString } from "class-validator";

export class Createquizdto{
    @IsString()
    Question : string;
    @IsString()
    Reponse : string;
    @IsString()
    Categorie : string;
    
}