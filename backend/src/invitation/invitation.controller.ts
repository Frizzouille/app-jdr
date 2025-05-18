import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserPayload } from 'src/auth/jwt.strategy';
import { Types } from 'mongoose';

@Controller('invitations')
export class InvitationController {
    constructor(private readonly invitationService: InvitationService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAdventures(@Request() req: Request & { user: UserPayload }) {
        const userId = req.user.userId;
        const invitations = await this.invitationService.getInvitationsByUser(
            new Types.ObjectId(userId),
        );
        return { invitations };
    }

    @UseGuards(JwtAuthGuard)
    @Post('update-status')
    async updateInvitationStatus(
        @Request() req: Request & { user: UserPayload },
        @Body() body: { invitationId: string; status: string },
    ) {
        const userId = req.user.userId;
        const { invitationId, status } = body;
        const invitation = await this.invitationService.updateInvitationStatus(
            new Types.ObjectId(userId),
            new Types.ObjectId(invitationId),
            status === 'true' ? 'accepted' : 'rejected',
        );

        if (!invitation) {
            throw new NotFoundException('Invitation not found');
        }

        return { adventureId: invitation.adventureId };
    }
}
