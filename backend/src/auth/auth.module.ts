// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt'; // Pour gérer les tokens JWT

@Module({
  imports: [
    JwtModule.register({
      secret: 'SECRET_KEY',  // Utiliser un secret robuste en production
      signOptions: { expiresIn: '1h' }, // Durée de validité du token
    }),
  ],
  controllers: [AuthController],  // Ajoute le contrôleur ici
  providers: [AuthService],      // Ajoute le service ici
})
export class AuthModule {}
