import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Character, CharacterDocument } from './schemas/character.schema';
import { Model, Types } from 'mongoose';
import { CreateCharacterDto } from './dto/create.dto';

import { featuresTranslations } from './translations/featuresTranslation';
import { skillsTranslations } from './translations/skillsTranslation';
import { raceLanguagesTranslations } from './translations/raceLanguagesTranslation';
import { Language } from './translations/typeTranslation';

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

    getBonusForRace(race: string): Object {
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

    getFeaturesForClass(
        language: Language,
        className: string,
    ): { [key: string]: string } {
        const featuresArray = this.getFeaturesArray(className);
        const featuresObject: { [key: string]: string } = {};

        for (const feature of featuresArray) {
            featuresObject[feature] = featuresTranslations[feature][language]; // Valeur traduite
        }

        return featuresObject;
    }

    getSkillsForClassOrBackground(
        language: Language,
        className?: string,
        background?: string,
    ): {
        classSkills: { [key: string]: string };
        numberClassSkills: number;
        backgroundSkills: { [key: string]: string };
    } {
        const { numberClassSkills, ...skills } = this.getSkillsObject(
            className,
            background,
        );

        const skillsObject: {
            classSkills: { [key: string]: string };
            numberClassSkills: number;
            backgroundSkills: { [key: string]: string };
        } = {
            classSkills: {},
            numberClassSkills: numberClassSkills,
            backgroundSkills: {},
        };

        for (const key in skills) {
            for (const skill of skills[key]) {
                skillsObject[key][skill] = skillsTranslations[skill][language]; // Valeur traduite
            }
        }

        return skillsObject;
    }

    getRaceLanguages(language: Language) {
        const raceLanguages = {};

        for (const key in raceLanguagesTranslations) {
            raceLanguages[key] = raceLanguagesTranslations[key][language];
        }

        return raceLanguages;
    }

    private getSkillsObject(
        className?: string,
        background?: string,
    ): {
        classSkills: string[];
        numberClassSkills: number;
        backgroundSkills: string[];
    } {
        const classSkillsMap: Record<string, string[]> = {
            barbarian: [
                'athletics',
                'animal_handling',
                'intimidation',
                'nature',
                'perception',
                'survival',
            ],
            bard: [
                'acrobatics',
                'arcana',
                'athletics',
                'stealth',
                'animal_handling',
                'sleight_of_hand',
                'history',
                'intimidation',
                'insight',
                'investigation',
                'medecine',
                'nature',
                'perception',
                'persuasion',
                'religion',
                'performance',
                'survival',
                'deception',
            ],
            cleric: [
                'history',
                'insight',
                'medecine',
                'persuasion',
                'religion',
            ],
            druid: [
                'arcana',
                'animal_handling',
                'insight',
                'medecine',
                'nature',
                'perception',
                'religion',
                'survival',
            ],
            fighter: [
                'acrobatics',
                'athletics',
                'animal_handling',
                'history',
                'intimidation',
                'insight',
                'perception',
                'survival',
            ],
            monk: [
                'acrobatics',
                'athletics',
                'stealth',
                'history',
                'insight',
                'religion',
            ],
            paladin: [
                'athletics',
                'intimidation',
                'insight',
                'medecine',
                'persuasion',
                'religion',
            ],
            ranger: [
                'athletics',
                'stealth',
                'animal_handling',
                'insight',
                'investigation',
                'nature',
                'perception',
                'survival',
            ],
            rogue: [
                'acrobatics',
                'athletics',
                'stealth',
                'sleight_of_hand',
                'intimidation',
                'insight',
                'investigation',
                'perception',
                'persuasion',
                'performance',
                'deception',
            ],
            warlock: [
                'arcana',
                'history',
                'intimidation',
                'investigation',
                'nature',
                'religion',
                'deception',
            ],
            wizard: [
                'arcana',
                'history',
                'insight',
                'investigation',
                'medecine',
                'religion',
            ],
            sorcerer: [
                'arcana',
                'intimidation',
                'insight',
                'persuasion',
                'religion',
                'deception',
            ],
        };

        const backgroundSkillsMap: Record<string, string[]> = {
            acolyte: ['insight', 'religion'],
            charlatan: ['sleight_of_hand', 'deception'],
            criminal: ['stealth', 'deception'],
            entertainer: ['acrobatics', 'performance'],
            folk_hero: ['animal_handling', 'survival'],
            guild_artisan: ['insight', 'persuasion'],
            hermit: ['medecine', 'religion'],
            knight: ['history', 'persuasion'],
            noble: ['history', 'persuasion'],
            outlander: ['athletics', 'survival'],
            pirate: ['athletics', 'perception'],
            sage: ['arcana', 'history'],
            sailor: ['athletics', 'perception'],
            soldier: ['athletics', 'intimidation'],
            urchin: ['sleight_of_hand', 'stealth'],
        };

        let numberClassSkills = 0;
        switch (className) {
            case 'bard':
            case 'ranger':
                numberClassSkills = 3;
                break;
            case 'cleric':
            case 'rogue':
                numberClassSkills = 4;
                break;
            default:
                numberClassSkills = 2;
                break;
        }
        return {
            classSkills: className ? classSkillsMap[className] || [] : [],
            numberClassSkills: numberClassSkills,
            backgroundSkills: background
                ? backgroundSkillsMap[background] || []
                : [],
        };
    }

    private getFeaturesArray(className: string): string[] {
        switch (className) {
            case 'barbarian':
                return ['rage', 'unarmored_defense'];
            case 'bard':
                return ['bardic_inspiration', 'spellcasting'];
            case 'cleric':
                return ['divine_domain', 'spellcasting'];
            case 'druid':
                return ['druidic_language', 'spellcasting'];
            case 'fighter':
                return ['fighting_style', 'second_wind'];
            case 'monk':
                return ['martial_arts', 'unarmored_defense'];
            case 'paladin':
                return ['divine_sense', 'lay_on_hands'];
            case 'ranger':
                return ['favored_enemy', 'natural_explorer'];
            case 'rogue':
                return ['sneak_attack', 'expertise'];
            case 'wizard':
                return ['arcane_recovery', 'spellcasting'];
            case 'sorcerer':
                return ['magical_origin', 'spellcasting'];
            case 'warlock':
                return ['occult_magic', 'supernatural_patron'];

            default:
                return [];
        }
    }
}
