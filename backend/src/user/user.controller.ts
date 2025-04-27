import { Controller, Post, Body, Get, Param } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateDto } from './dto/create.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}
    // localhost:3000/users

    @Get()
    async getUsers() {
        return this.userService.getUsers();
    }

    @Post('create')
    async createUser(@Body() createDto: CreateDto) {
        const user = await this.userService.createUser(createDto);
        console.log(user);
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    @Get(':email')
    async getUser(@Param('email') email: string) {
        return this.userService.getUserByEmail(email);
    }
}
