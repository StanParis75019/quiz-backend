import { IsOptional, IsString } from "class-validator";

export class UpdateCategoryDto {
    @IsString()
    @IsOptional()
    // Valide si le champ 'name' est une chaîne de caractères (facultatif)
    name: string;

    @IsString()
    @IsOptional()
    // Valide si le champ 'description' est une chaîne de caractères (facultatif)
    description: string;
}
