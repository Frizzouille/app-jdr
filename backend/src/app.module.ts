import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AdventureModule } from './adventure/adventure.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        UsersModule,
        DatabaseModule,
        AdventureModule,
    ],
})
export class AppModule {}
