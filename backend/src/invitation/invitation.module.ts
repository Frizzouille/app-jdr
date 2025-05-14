import { forwardRef, Module } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Invitation, InvitationSchema } from './schemas/invitation.schema';
import { AdventureModule } from 'src/adventure/adventure.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Invitation.name,
                schema: InvitationSchema,
            },
        ]),
        forwardRef(() => AdventureModule),
    ],
    controllers: [InvitationController],
    providers: [InvitationService],
    exports: [InvitationService],
})
export class InvitationModule {}
