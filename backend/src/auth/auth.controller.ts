import {
    Controller,
    Post,
    Body,
    Get,
    UseGuards,
    Request,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from '../user/dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { UserPayload } from './jwt.strategy';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @Post('login') // localhost:3000/auth/login
    async login(@Body() LoginDto: LoginDto) {
        return this.authService.login(LoginDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get() // localhost:3000/auth
    async authenticate(@Request() req: { user: UserPayload }) {
        const res = this.userService.getUserById(req.user.userId);
        return res;
    }
}
