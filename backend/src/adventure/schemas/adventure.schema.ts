import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AdventureDocument = Adventure & Document;

@Schema({
    autoIndex: true,
    timestamps: true,
})
export class Adventure {
    _id: Types.ObjectId;

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;
}

export const AdventureSchema = SchemaFactory.createForClass(Adventure);
