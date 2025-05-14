import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Adventure, AdventureSchema } from './schemas/adventure.schema'; // Import du schéma

import { AdventureService } from './adventure.service';
import { AdventureController } from './adventure.controller';
import { InvitationModule } from 'src/invitation/invitation.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Adventure.name, schema: AdventureSchema },
        ]),
        forwardRef(() => InvitationModule),
        forwardRef(() => UserModule),
    ],
    controllers: [AdventureController],
    providers: [AdventureService],
    exports: [AdventureService],
})
export class AdventureModule {}
