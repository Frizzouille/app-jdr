import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCharacterDto } from './dto/create.dto';
import { UserPayload } from 'src/auth/jwt.strategy';
import { Types } from 'mongoose';
import { Language } from './translations/typeTranslation';
@Controller('characters')
export class CharacterController {
    constructor(private readonly characterService: CharacterService) {}

    @Get('bonus')
    @HttpCode(HttpStatus.OK)
    async getBonus(@Query('race') race: string) {
        const bonus = this.characterService.getBonusForRace(race);
        return { bonus };
    }

    @Get('features/:className')
    @HttpCode(HttpStatus.OK)
    async getFeatures(
        @Param('className') className: string,
        @Query('language') language: Language = 'en',
    ) {
        const features = this.characterService.getFeaturesForClass(
            language,
            className,
        );
        return { features };
    }

    @Get('skills')
    @HttpCode(HttpStatus.OK)
    async getSkills(
        @Query('class') className: string | undefined,
        @Query('background') background: string | undefined,
        @Query('language') language: Language = 'en',
    ) {
        const skills = this.characterService.getSkillsForClassOrBackground(
            language,
            className,
            background,
        );
        return { skills };
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async createUser(
        @Request() req: { user: UserPayload },
        @Body()
        post: { adventureId: string; characterData: CreateCharacterDto },
    ) {
        const userId = req.user.userId;
        const character = await this.characterService.createCharacter(
            new Types.ObjectId(userId),
            new Types.ObjectId(post.adventureId),
            post.characterData,
        );
        return { character };
    }
}
