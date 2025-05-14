import { Controller } from '@nestjs/common';
import { InvitationService } from './invitation.service';

@Controller('Invitation')
export class InvitationController {
    constructor(private readonly InvitationService: InvitationService) {}
}
