import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateAdventureDto } from './dto/create.dto';
import { Model, Types } from 'mongoose';
import { Adventure, AdventureDocument } from './schemas/adventure.schema';
import {
    AdventureUser,
    AdventureUserDocument,
} from './schemas/adventureUser.schema';

@Injectable()
export class AdventureService {
    constructor(
        @InjectModel(Adventure.name)
        private adventureModel: Model<AdventureDocument>,
        @InjectModel(AdventureUser.name)
        private adventureUserModel: Model<AdventureUserDocument>,
    ) {}

    async getAdventures(): Promise<Adventure[]> {
        return this.adventureModel.find().exec();
    }

    // Trouve une aventure par son id
    async getAdventureById(
        userId: Types.ObjectId,
        id: Types.ObjectId,
    ): Promise<Adventure | null> {
        const adventureUser = await this.adventureUserModel.findOne({
            userId,
            adventureId: id,
        });

        if (!adventureUser) {
            throw new UnauthorizedException("L'aventure n'a pas était trouvé.");
        }

        this.adventureUserModel.updateOne(
            { userId, adventureId: id },
            {
                $set: { lastOpened: new Date() },
            },
        );

        return this.adventureModel.findById(id).exec();
    }

    // Trouve les aventures liées à un user
    async getAdventuresByUser(
        userId: Types.ObjectId,
        sort?: string,
        order?: string,
    ): Promise<Adventure[] | null> {
        const sortField = sort || 'createdAt';
        const sortOrder = order === 'desc' ? -1 : 1;

        return this.adventureUserModel
            .aggregate([
                { $match: { userId } },

                {
                    $lookup: {
                        from: 'adventures',
                        localField: 'adventureId',
                        foreignField: '_id',
                        as: 'adventure',
                    },
                },
                { $unwind: '$adventure' },

                // Ajoute userRole = role dans adventureUser ou 'creator' si c’est le créateur
                {
                    $addFields: {
                        'adventure.userRole': {
                            $cond: [
                                { $eq: ['$userId', '$adventure.creatorId'] },
                                'creator',
                                '$role',
                            ],
                        },
                    },
                },

                { $replaceRoot: { newRoot: '$adventure' } },
                { $sort: { [sortField]: sortOrder } },
            ])
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
            const adventure = await createAdventure.save();

            const adventureUser = new this.adventureUserModel({
                userId,
                adventureId: adventure.id,
                role: 'creator',
            });
            adventureUser.save();
            return adventure;
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
        this.adventureModel
            .findOneAndUpdate(
                { _id: adventureId },
                { $addToSet: { playersId: userId } },
                { new: true },
            )
            .exec();

        const adventureUser = new this.adventureUserModel({
            userId,
            adventureId,
            role: 'player',
        });
        adventureUser.save();
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
