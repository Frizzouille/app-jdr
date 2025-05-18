import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type InvitationDocument = Invitation & Document;

@Schema({
    autoIndex: true,
    timestamps: true,
})
export class Invitation {
    _id: Types.ObjectId;

    @Prop({
        type: Types.ObjectId,
        ref: 'Adventure',
        required: true,
    })
    adventureId: Types.ObjectId;

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    })
    userId: Types.ObjectId;

    @Prop({ required: true, default: 'invited' })
    status: string;
}

export const InvitationSchema = SchemaFactory.createForClass(Invitation);
