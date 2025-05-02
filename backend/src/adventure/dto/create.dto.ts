import { IsString } from 'class-validator';

export class CreateAdventureDto {
    @IsString({ message: 'Vous devez fournir un nom valide.' })
    title: string; // Prénom de l'utilisateur

    @IsString()
    description?: string; // Nom de l'utilisateur
}
