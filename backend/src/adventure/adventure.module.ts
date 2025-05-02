import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Adventure, AdventureSchema } from './schemas/adventure.schema'; // Import du schéma

import { AdventureService } from './adventure.service';
import { AdventureController } from './adventure.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Adventure.name, schema: AdventureSchema },
        ]),
    ],
    controllers: [AdventureController],
    providers: [AdventureService],
})
export class AdventureModule {}
