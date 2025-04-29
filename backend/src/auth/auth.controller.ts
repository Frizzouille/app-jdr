import {
    Controller,
    Post,
    Body,
    Get,
    UseGuards,
    Request,
    HttpCode,
    HttpStatus,
    NotFoundException,
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
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get() // localhost:3000/auth
    @HttpCode(HttpStatus.OK)
    async authenticate(@Request() req: { user: UserPayload }) {
        const res = await this.userService.getUserById(req.user.userId);

        if (!res) {
            throw new NotFoundException('Utilisateur non trouvé');
        }

        const { id, email } = res;
        return { id, email };
    }
}
