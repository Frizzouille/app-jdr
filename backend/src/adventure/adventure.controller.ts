import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Request,
    HttpStatus,
    HttpCode,
    UseGuards,
    Query,
} from '@nestjs/common';
import { AdventureService } from './adventure.service';
import { CreateAdventureDto } from './dto/create.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserPayload } from 'src/auth/jwt.strategy';
import { InvitationService } from 'src/invitation/invitation.service';
import { CharacterService } from 'src/character/character.service';
import { UserService } from 'src/user/user.service';
import { Types } from 'mongoose';

@Controller('adventures')
export class AdventureController {
    constructor(
        private readonly adventureService: AdventureService,
        private readonly invitationService: InvitationService,
        private readonly characterService: CharacterService,
        private readonly userService: UserService,
    ) {}
    // localhost:3000/adventures

    @UseGuards(JwtAuthGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAdventures(
        @Request() req: Request & { user: UserPayload },
        @Query('sort') sort: string,
        @Query('order') order: string,
    ) {
        const userId = req.user.userId;
        const adventures = await this.adventureService.getAdventuresByUser(
            new Types.ObjectId(userId),
            sort,
            order,
        );
        return { adventures };
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getAdventureById(@Param('id') id: string) {
        const adventure = await this.adventureService.getAdventureById(
            new Types.ObjectId(id),
        );
        return { adventure };
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async createAdventure(
        @Request() req: { user: UserPayload },
        @Body() createAdventureDto: CreateAdventureDto,
    ) {
        const userId = req.user.userId;

        return await this.adventureService.createAdventure(
            new Types.ObjectId(userId),
            createAdventureDto,
        );
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/invite')
    @HttpCode(HttpStatus.CREATED)
    async inviteUsers(
        @Request() req: { user: UserPayload },
        @Body() post: { aventureId: string; invitedUsers: string[] },
    ) {
        const userId = req.user.userId;
        const invitedUsersId = await this.userService.getUsersByEmail(
            post.invitedUsers,
        );
        return await this.invitationService.inviteUsers(
            new Types.ObjectId(userId),
            new Types.ObjectId(post.aventureId),
            invitedUsersId,
        );
    }

    @UseGuards(JwtAuthGuard)
    @Post('characters')
    @HttpCode(HttpStatus.OK)
    async getCharacters(
        @Request() req: { user: UserPayload },
        @Body() post: { adventureId: string },
    ) {
        const userId = req.user.userId;
        return await this.characterService.getCharactersByUserAndAdventure(
            new Types.ObjectId(userId),
            new Types.ObjectId(post.adventureId),
        );
    }
}
