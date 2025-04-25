// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { LoginDto } from './login.dto';
import * as bcrypt from 'bcrypt'; // Si tu utilises bcrypt pour le hash du mot de passe
import { JwtService } from '@nestjs/jwt'; // Pour créer des tokens JWT

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Remplacer cette partie par une recherche dans ta base de données
    const user = { email: 'test@example.com', password: 'password123' };

    console.log(email, password);
    // Vérifier le mot de passe (avec bcrypt si nécessaire)
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Identifiants incorrects');
    }

    // Générer un token JWT
    const token = this.jwtService.sign({ email: user.email });

    return { access_token: token }; // Le token est retourné au frontend
  }
}
