import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Adventure, AdventureDocument } from './schemas/adventure.schema';
import { CreateAdventureDto } from './dto/create.dto';
import { Model } from 'mongoose';

@Injectable()
export class AdventureService {
    constructor(
        @InjectModel(Adventure.name)
        private adventureModel: Model<AdventureDocument>,
    ) {}

    async getAdventures(): Promise<Adventure[]> {
        return await this.adventureModel.find().exec();
    }

    // Trouve une aventure par son id
    async getAdventureById(id: string): Promise<Adventure | null> {
        return await this.adventureModel
            .findByIdAndUpdate(id, { lastOpened: new Date() }, { new: true })
            .exec();
    }

    // Trouve les aventures liées à un user
    async getAdventuresByUserId(
        userId: string,
        sort?: string,
        order?: string,
    ): Promise<Adventure[] | null> {
        const sortField = sort || 'createdAt';
        const sortOrder = order === 'desc' ? -1 : 1;

        return await this.adventureModel
            .find({ userId })
            .sort({ [sortField]: sortOrder })
            .exec();
    }

    // Créer un nouvel utilisateur
    async createAdventure(
        userId: string,
        createDto: CreateAdventureDto,
    ): Promise<Adventure | undefined> {
        const createAdventure = new this.adventureModel({
            userId,
            ...createDto,
        });
        try {
            return await createAdventure.save();
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
}
