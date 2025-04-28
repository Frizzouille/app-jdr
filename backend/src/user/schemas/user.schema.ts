import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as cuid from 'cuid'; // Import de la bibliothèque cuid

export type UserDocument = User & Document;

@Schema({
    autoIndex: true,
    timestamps: true,
})
export class User {
    @Prop({ default: () => cuid() }) // Utilisation de cuid pour générer un id unique par défaut
    id: string;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
