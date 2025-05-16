import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateAdventureDto } from './dto/create.dto';
import { Adventure, AdventureDocument } from './schemas/adventure.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class AdventureService {
    constructor(
        @InjectModel(Adventure.name)
        private adventureModel: Model<AdventureDocument>,
    ) {}

    async getAdventures(): Promise<Adventure[]> {
        return this.adventureModel.find().exec();
    }

    // Trouve une aventure par son id
    async getAdventureById(id: Types.ObjectId): Promise<Adventure | null> {
        return this.adventureModel
            .findByIdAndUpdate(id, { lastOpened: new Date() }, { new: true })
            .exec();
    }

    // Trouve les aventures liées à un user
    async getAdventuresByUser(
        userId: Types.ObjectId,
        sort?: string,
        order?: string,
    ): Promise<Adventure[] | null> {
        const sortField = sort || 'createdAt';
        const sortOrder = order === 'desc' ? -1 : 1;

        return this.adventureModel
            .find({
                $or: [{ userId }, { playersId: userId }],
            })
            .sort({ [sortField]: sortOrder })
            .exec();
    }

    // Créer un nouvel utilisateur
    async createAdventure(
        userId: Types.ObjectId,
        createDto: CreateAdventureDto,
    ): Promise<Adventure | undefined> {
        const createAdventure = new this.adventureModel({
            userId,
            ...createDto,
        });
        try {
            return createAdventure.save();
        } catch (e) {
            throw new HttpException(
                {
                    message: [
                        e.message ||
                            "Une erreur est survenue lors de la création de l'aventure",
                    ],
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async addUser(adventureId: Types.ObjectId, userId: Types.ObjectId) {
        return this.adventureModel
            .findOneAndUpdate(
                { _id: adventureId },
                { $addToSet: { playersId: userId } },
                { new: true },
            )
            .exec();
    }

    async removeUser(adventureId: Types.ObjectId, userId: Types.ObjectId) {
        return this.adventureModel
            .findOneAndUpdate(
                { _id: adventureId },
                { $pull: { playersId: userId } },
                { new: true },
            )
            .exec();
    }
}
