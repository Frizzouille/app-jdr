import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './schemas/user.schema'; // Import du schéma

import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // <-- Ajout du schéma
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UsersModule {}
