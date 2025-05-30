import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { hash } from 'bcrypt';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async getUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    // Trouver un utilisateur par email
    async getUserByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    // Trouver des utilisateur par une liste d'email
    async getUsersByEmail(emails: string[]): Promise<User[] | null> {
        return this.userModel.find({ email: { $in: emails } }).exec();
    }

    // Trouver un utilisateur par id
    async getUserById(id: Types.ObjectId): Promise<User | null> {
        return this.userModel.findById(id).exec();
    }

    // Créer un nouvel utilisateur
    async createUser(createDto: CreateUserDto): Promise<User | undefined> {
        const existingUser = await this.getUserByEmail(createDto.email);
        if (existingUser) {
            throw new HttpException(
                {
                    message: ['Cette adresse mail est déjà liée à un compte.'],
                    statusCode: HttpStatus.CONFLICT,
                },
                HttpStatus.CONFLICT,
            );
        }
        const hashedPassword = await this.hashPassword(createDto.password);

        const createdUser = new this.userModel({
            ...createDto,
            password: hashedPassword,
        });
        try {
            return await createdUser.save();
        } catch (e) {
            throw new HttpException(
                {
                    message: [
                        e.message ||
                            "Une erreur est survenue lors de la création de l'utilisateur",
                    ],
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    // Hash un mdp // Utilisation pour création ou modification du mdp d'un user
    private async hashPassword(password: string) {
        return hash(password, 10);
    }
}
