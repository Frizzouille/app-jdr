import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Character, CharacterDocument } from './schemas/character.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class CharacterService {
    constructor(
        @InjectModel(Character.name)
        private characterModel: Model<CharacterDocument>,
    ) {}

    async getCharactersByUserAndAdventure(
        userId: Types.ObjectId,
        adventureId: Types.ObjectId,
    ): Promise<Character[]> {
        return this.characterModel.find({ userId, adventureId }).exec();
    }
}
