import { IsOptional, IsString } from "class-validator";

export class Updatequizdto{
    @IsOptional()
    @IsString()
    Question : string;
    @IsOptional()
    @IsString()
    Reponse : string;
    @IsOptional()
    @IsString()
    Categorie : string;
}