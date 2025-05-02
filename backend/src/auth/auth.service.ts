import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // Pour créer des tokens JWT
import { compare } from 'bcrypt';
import { LoginUserDto } from '../user/dto/login.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService, // private readonly userService: UserService,
        private userService: UserService, // private readonly userService: UserService,
    ) {}

    // Connexion avec couple {email, password}
    async login(loginDto: LoginUserDto) {
        const { email, password } = loginDto;

        // Recherche dans la base un utilisateur avec cette adresse mail
        const user = await this.userService.getUserByEmail(email);

        // Vérifier le mot de passe (avec bcrypt si nécessaire)
        if (
            !user ||
            !(await this.isPasswordValid({
                password: password,
                hashedPassword: user.password,
            }))
        ) {
            throw new UnauthorizedException('Identifiants incorrects');
        }

        const { access_token } = this.authenticateUser({
            userId: user._id.toString(),
        });
        return {
            access_token,
            id: user._id.toString(),
            email,
            firstname: user.firstname,
            surname: user.surname,
        };
    }

    // Compare un mot (password) avec sa version hash (hashedPassword)
    private async isPasswordValid({
        password,
        hashedPassword,
    }: {
        password: string;
        hashedPassword: string;
    }) {
        return await compare(password, hashedPassword);
    }

    // Renvoie un payload signé par jwtService
    private authenticateUser({ userId }: { userId: string }) {
        const payload = { userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
