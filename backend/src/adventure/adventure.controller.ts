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

@Controller('adventures')
export class AdventureController {
    constructor(private readonly adventureService: AdventureService) {}
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
        const adventures = await this.adventureService.getAdventuresByUserId(
            userId,
            sort,
            order,
        );
        return { adventures };
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getAdventureById(@Param('id') id: string) {
        const adventure = await this.adventureService.getAdventureById(id);
        return { adventure };
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createAdventure(
        @Request() req: { user: UserPayload },
        @Body() createAdventureDto: CreateAdventureDto,
    ) {
        const userId = req.user.userId;
        return await this.adventureService.createAdventure(
            userId,
            createAdventureDto,
        );
    }
}
