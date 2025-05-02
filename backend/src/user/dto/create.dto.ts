import { IsString, IsOptional } from 'class-validator';
import { UserDto } from './user.dto';

export class CreateUserDto extends UserDto {
    @IsOptional()
    @IsString()
    firstname?: string; // Prénom de l'utilisateur

    @IsOptional()
    @IsString()
    surname?: string; // Nom de l'utilisateur
}
