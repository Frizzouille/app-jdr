import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Request,
    HttpCode,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.dto';
import { AuthService } from 'src/auth/auth.service';
import { AdventureService } from 'src/adventure/adventure.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserPayload } from 'src/auth/jwt.strategy';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly adventureService: AdventureService,
    ) {}
    // localhost:3000/users

    @Get()
    @HttpCode(HttpStatus.OK)
    async getUsers() {
        return this.userService.getUsers();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getUserById(@Request() req: { user: UserPayload }) {
        return this.userService.getUserById(req.user.userId);
    }

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() createDto: CreateUserDto) {
        await this.userService.createUser(createDto);

        return await this.authService.login({
            password: createDto.password,
            email: createDto.email,
        });
    }

    @Get(':id/adventures')
    @HttpCode(HttpStatus.OK)
    async getAdventuresByUserId(@Param('id') id: string) {
        return this.adventureService.getAdventuresByUserId(id);
    }
}
