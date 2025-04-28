import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateDto } from './dto/create.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}
    // localhost:3000/users

    @Get()
    @HttpCode(HttpStatus.OK)
    async getUsers() {
        return this.userService.getUsers();
    }

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() createDto: CreateDto) {
        await this.userService.createUser(createDto);

        return await this.authService.login({
            password: createDto.password,
            email: createDto.email,
        });
    }

    @Get(':email')
    @HttpCode(HttpStatus.OK)
    async getUser(@Param('email') email: string) {
        return this.userService.getUserByEmail(email);
    }
}
