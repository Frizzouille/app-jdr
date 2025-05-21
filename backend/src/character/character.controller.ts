import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
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

@Controller('characters')
export class CharacterController {
    constructor(private readonly characterService: CharacterService) {}

    @Get('bonus')
    @HttpCode(HttpStatus.OK)
    async getBonus(@Query('race') race: string) {
        const bonus = this.characterService.getBonusForRace(race);
        return { bonus };
    }

    @Get('features')
    @HttpCode(HttpStatus.OK)
    async getFeatures(@Query('class') classe: string) {
        const features = this.characterService.getFeaturesForClass(classe);
        return { features };
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
