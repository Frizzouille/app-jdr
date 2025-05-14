import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './schemas/user.schema'; // Import du schéma

import { UserService } from './user.service';
import { UserController } from './user.controller';
import {
    Adventure,
    AdventureSchema,
} from 'src/adventure/schemas/adventure.schema';
import { AuthModule } from 'src/auth/auth.module';
import { AdventureModule } from 'src/adventure/adventure.module';
import { InvitationModule } from 'src/invitation/invitation.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([
            { name: Adventure.name, schema: AdventureSchema },
        ]),
        forwardRef(() => AuthModule),
        forwardRef(() => AdventureModule),
        forwardRef(() => InvitationModule),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
