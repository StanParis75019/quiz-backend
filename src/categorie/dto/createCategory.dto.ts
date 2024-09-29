import { IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    // Valide si le champ 'name' est une chaîne de caractères
    name: string;

    @IsString()
    // Valide si le champ 'description' est une chaîne de caractères (facultatif)
    description?: string;
}
