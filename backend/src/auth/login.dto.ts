// src/auth/login.dto.ts
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
    @IsEmail() // Validation de l'email
    email: string;

    @IsString() // Validation du mot de passe
    password: string;
}
