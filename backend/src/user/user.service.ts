import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { hash } from 'bcrypt';

import { User, UserDocument } from './schemas/user.schema';
import { CreateDto } from './dto/create.dto';
@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async getUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    // Créer un nouvel utilisateur
    async createUser(createDto: CreateDto): Promise<User> {
        const existingUser = await this.getUserByEmail(createDto.email);
        if (existingUser) {
            throw new HttpException(
                "L'email existe déjà dans la base",
                HttpStatus.CONFLICT,
            );
        }
        const hashedPassword = await this.hashPassword(createDto.password);

        const createdUser = new this.userModel({
            ...createDto,
            password: hashedPassword,
        });
        try {
            return createdUser.save();
        } catch (e) {
            throw new HttpException(
                e.message ||
                    "Une erreur est survenue lors de la création de l'utilisateur",
                HttpStatus.INTERNAL_SERVER_ERROR, // Code HTTP 500 pour erreur interne
            );
        }
    }

    // Trouver un utilisateur par email
    async getUserByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    // Trouver un utilisateur par email
    async getUserById(cuid: string): Promise<User | null> {
        return this.userModel.findOne({ cuid }).exec();
    }

    // Hash un mdp // Utilisation pour création ou modification du mdp d'un user
    private async hashPassword(password: string) {
        return await hash(password, 10);
    }
}
