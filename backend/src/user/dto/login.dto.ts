// src/auth/dto/login.dto.ts
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
    @IsEmail({}, { message: 'Vous devez fournir une adresse mail valide.' }) // Validation de l'email
    email: string;

    @IsString() // Validation du mot de passe
    password: string;
}
