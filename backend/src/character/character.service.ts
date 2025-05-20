import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Character, CharacterDocument } from './schemas/character.schema';
import { Model, Types } from 'mongoose';
import { CreateCharacterDto } from './dto/create.dto';

@Injectable()
export class CharacterService {
    constructor(
        @InjectModel(Character.name)
        private characterModel: Model<CharacterDocument>,
    ) {}

    async getCharacterByUserAndAdventure(
        userId: Types.ObjectId,
        adventureId: Types.ObjectId,
    ): Promise<Character | null> {
        return this.characterModel.findOne({ userId, adventureId }).exec();
    }

    getBonusForClass(race: string) {
        const bonus = {
            highElf: { dexterity: 2, intelligence: 1 },
            woodElf: { dexterity: 2, wisdom: 1 },
            darkElf: { dexterity: 2, charisma: 1 },
            lightfootHalfling: { dexterity: 2, charisma: 1 },
            stoutHalfling: { dexterity: 2, constitution: 1 },
            human: {
                strength: 1,
                dexterity: 1,
                constitution: 1,
                intelligence: 1,
                wisdom: 1,
                charisma: 1,
            },
            hillDwarf: { constitution: 2, wisdom: 1 },
            mountainDwarf: { constitution: 2, strength: 2 },
            halfElf: { charisma: 2, dexterity: 1, wisdom: 1 }, // normalement, au choix
            halfOrc: { strength: 2, constitution: 1 },
            dragonborn: { strength: 2, charisma: 1 },
            forestGnome: { intelligence: 2, dexterity: 1 },
            rockGnome: { intelligence: 2, constitution: 1 },
            tiefling: { charisma: 2, intelligence: 1 },
        };
        return bonus[race];
    }

    async createCharacter(
        userId: Types.ObjectId,
        adventureId: Types.ObjectId,
        createDto: CreateCharacterDto,
    ): Promise<Character> {
        const bonusStats = this.getBonusForClass(createDto.race);
        let stats = { base: createDto.stats, bonus: bonusStats };
        const newCharacter = new this.characterModel({
            userId,
            adventureId,
            ...{ ...createDto, stats: stats },
        });

        try {
            // Validation Mongoose avant save
            await newCharacter.validate();

            return newCharacter.save();
        } catch (e) {
            throw new HttpException(
                {
                    message: [
                        e.message ||
                            'Une erreur est survenue lors de la création du personnage',
                    ],
                    statusCode:
                        e.name === 'ValidationError'
                            ? HttpStatus.BAD_REQUEST
                            : HttpStatus.INTERNAL_SERVER_ERROR,
                },
                e.name === 'ValidationError'
                    ? HttpStatus.BAD_REQUEST
                    : HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
