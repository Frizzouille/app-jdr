import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now, Types } from 'mongoose';

export type AdventureUserDocument = AdventureUser & Document;

@Schema({
    autoIndex: true,
    timestamps: true,
})
export class AdventureUser {
    _id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Adventure', required: true })
    adventureId: Types.ObjectId;

    @Prop({ type: Date, default: now })
    lastOpened: Date;

    @Prop({ type: Date, default: now })
    joinedAt: Date;

    @Prop({ required: true })
    role: 'creator' | 'player'; // optionnel
}

export const AdventureUserSchema = SchemaFactory.createForClass(AdventureUser);
