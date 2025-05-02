import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserDto {
    @IsEmail({}, { message: 'Vous devez fournir une adresse mail valide.' })
    email: string;

    @IsString()
    @MinLength(6, {
        message: 'Votre mot de passe doit faire au minimum 6 caractères',
    })
    password: string;
}
