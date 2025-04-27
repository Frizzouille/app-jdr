import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // Pour créer des tokens JWT
import { hash, compare } from 'bcrypt';
import { LoginDto } from './login.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService, // private readonly userService: UserService,
        private userService: UserService, // private readonly userService: UserService,
    ) {}

    // Connexion avec couple {email, password}
    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        // Remplacer cette partie par une recherche dans ta base de donnée
        const users = this.userService.getUsers();

        const user = users.find((u) => u.email === email);

        //   Vérifier le mot de passe (avec bcrypt si nécessaire)
        if (
            !user ||
            !(
                user.email === email &&
                this.isPasswordValid({
                    password: password,
                    hashedPassword: user.password,
                })
            )
        ) {
            throw new UnauthorizedException('Identifiants incorrects');
        }

        return this.authenticateUser({ userId: user.id }); // Le token est retourné au frontend
    }

    // Hash un mdp // Utilisation pour création ou modification du mdp d'un user
    private async hashPassword(password: string) {
        return await hash(password, 10);
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
