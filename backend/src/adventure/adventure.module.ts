import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Adventure, AdventureSchema } from './schemas/adventure.schema'; // Import du schéma

import { AdventureService } from './adventure.service';
import { AdventureController } from './adventure.controller';
import { InvitationModule } from 'src/invitation/invitation.module';
import { UserModule } from 'src/user/user.module';
import { CharacterModule } from 'src/character/character.module';
import {
    AdventureUser,
    AdventureUserSchema,
} from './schemas/adventureUser.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Adventure.name, schema: AdventureSchema },
            { name: AdventureUser.name, schema: AdventureUserSchema },
        ]),
        forwardRef(() => InvitationModule),
        forwardRef(() => UserModule),
        forwardRef(() => CharacterModule),
    ],
    controllers: [AdventureController],
    providers: [AdventureService],
    exports: [AdventureService],
})
export class AdventureModule {}
