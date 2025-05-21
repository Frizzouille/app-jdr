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

    async createCharacter(
        userId: Types.ObjectId,
        adventureId: Types.ObjectId,
        createDto: CreateCharacterDto,
    ): Promise<Character> {
        const bonusStats = this.getBonusForRace(createDto.race);
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

    getBonusForRace(race: string) {
        switch (race) {
            case 'highElf':
                return { dexterity: 2, intelligence: 1 };
            case 'woodElf':
                return { dexterity: 2, wisdom: 1 };
            case 'darkElf':
                return { dexterity: 2, charisma: 1 };
            case 'lightfootHalfling':
                return { dexterity: 2, charisma: 1 };
            case 'stoutHalfling':
                return { dexterity: 2, constitution: 1 };
            case 'human':
                return {
                    strength: 1,
                    dexterity: 1,
                    constitution: 1,
                    intelligence: 1,
                    wisdom: 1,
                    charisma: 1,
                };
            case 'hillDwarf':
                return { constitution: 2, wisdom: 1 };
            case 'mountainDwarf':
                return { constitution: 2, strength: 2 };
            case 'halfElf':
                return { charisma: 2, dexterity: 1, wisdom: 1 }; // normalement, au choix
            case 'halfOrc':
                return { strength: 2, constitution: 1 };
            case 'dragonborn':
                return { strength: 2, charisma: 1 };
            case 'forestGnome':
                return { intelligence: 2, dexterity: 1 };
            case 'rockGnome':
                return { intelligence: 2, constitution: 1 };
            case 'tiefling':
                return { charisma: 2, intelligence: 1 };
            default:
                return {};
        }
    }

    getFeaturesForClass(className: string) {
        switch (className) {
            case 'barbarian':
                return ['Rage', 'Défense sans armure'];
            case 'bard':
                return ['Inspiration bardique', 'Lancer de sorts'];
            case 'cleric':
                return ['Domaine divin', 'Lancer de sorts'];
            case 'druid':
                return ['Langue druidique', 'Lancer de sorts'];
            case 'fighter':
                return ['Style de combat', 'Second souffle'];
            case 'monk':
                return ['Arts martiaux', 'Défense sans armure'];
            case 'paladin':
                return ['Sens divin', 'Imposition des mains'];
            case 'ranger':
                return ['Ennemi juré', 'Explorateur naturel'];
            case 'rogue':
                return ['Attaque sournoise', 'Expertise'];
            case 'wizard':
                return ['Récupération arcanique', 'Lancer de sorts'];
            case 'sorcerer':
                return ['Origine magique', 'Lancer de sorts'];
            case 'warlock':
                return ['Magie occulte', 'Patron surnaturel'];
            default:
                return [];
        }
    }
}
