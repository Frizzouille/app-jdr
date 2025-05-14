import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AdventureDocument = Adventure & Document;

@Schema({
    autoIndex: true,
    timestamps: true,
})
export class Adventure {
    _id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;

    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop()
    image: string;

    @Prop({ type: Date, default: null })
    lastOpened: Date;

    @Prop({ type: [Types.ObjectId], ref: 'User' })
    playersId: Types.ObjectId[];
}

export const AdventureSchema = SchemaFactory.createForClass(Adventure);
