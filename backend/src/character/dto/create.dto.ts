import {
    IsMongoId,
    IsNotEmpty,
    IsString,
    ValidateNested,
    IsArray,
    IsNumber,
    IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class CharacterClassDto {
    @IsString()
    @IsNotEmpty()
    class: string;

    @IsNumber()
    level: number;
}

class StatsDto {
    @IsNumber()
    strength: number;

    @IsNumber()
    dexterity: number;

    @IsNumber()
    constitution: number;

    @IsNumber()
    intelligence: number;

    @IsNumber()
    wisdom: number;

    @IsNumber()
    charisma: number;
}

export class CreateCharacterDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    race: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CharacterClassDto)
    classes: CharacterClassDto[];

    @IsString()
    @IsNotEmpty()
    background: string;

    @ValidateNested()
    @Type(() => StatsDto)
    stats: { base: StatsDto; bonus: {} };

    @IsString()
    @IsOptional()
    backstory?: string;
}
