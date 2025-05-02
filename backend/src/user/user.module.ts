import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './schemas/user.schema'; // Import du schéma

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from 'src/auth/auth.service';
import { AdventureService } from 'src/adventure/adventure.service';
import {
    Adventure,
    AdventureSchema,
} from 'src/adventure/schemas/adventure.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // <-- Ajout du schéma
        MongooseModule.forFeature([
            { name: Adventure.name, schema: AdventureSchema },
        ]), // <-- Ajout du schéma
    ],
    controllers: [UserController],
    providers: [UserService, AuthService, AdventureService],
})
export class UsersModule {}
