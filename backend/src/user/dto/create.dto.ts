// src/auth/dto/create.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateDto {
    @IsEmail({}, { message: 'Vous devez fournir une adresse mail valide.' }) // Validation de l'email
    email: string;

    @IsString() // Validation du mot de passe
    @MinLength(6, {
        message: 'Votre mot de passe doit faire au minimum 8 caractères',
    })
    password: string;
}
