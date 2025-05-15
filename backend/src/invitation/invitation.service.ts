import {
    Body,
    HttpException,
    HttpStatus,
    Injectable,
    Post,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Invitation, InvitationDocument } from './schemas/invitation.schema';
import { AdventureService } from 'src/adventure/adventure.service';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class InvitationService {
    constructor(
        @InjectModel(Invitation.name)
        private InvitationModel: Model<InvitationDocument>,
        private readonly AdventureService: AdventureService,
    ) {}

    // Trouve les invitations aux aventures liées à un user
    async getInvitationsByUserId(
        userId: Types.ObjectId,
    ): Promise<Invitation[] | null> {
        return this.InvitationModel.find({ userId, status: 'invited' })
            .populate({
                path: 'adventureId',
                select: 'title',
            })
            .sort({ createdAt: -1 })
            .exec();
    }

    async inviteUsers(
        userId: Types.ObjectId,
        adventureId: Types.ObjectId,
        invitedUsers: User[] | null,
    ) {
        const adventure = await this.AdventureService.getAdventureById(
            adventureId,
        );

        if (adventure === null || adventure.userId != userId) {
            throw new HttpException(
                {
                    message: [
                        "Vous ne pouvez pas inviter un joueur dans une aventure que vous n'avez pas créé.",
                    ],
                    statusCode: HttpStatus.UNAUTHORIZED,
                },
                HttpStatus.UNAUTHORIZED,
            );
        }

        if (!invitedUsers) {
            throw new HttpException(
                {
                    message: [
                        'La liste des utilisateurs a inviter est incorrect.',
                    ],
                    statusCode: HttpStatus.BAD_REQUEST,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
        const validUserIds = invitedUsers.filter(
            (tempUser) =>
                !adventure.playersId.includes(tempUser._id) &&
                userId != tempUser._id,
        );

        const invitations = validUserIds.map((tempUser) => ({
            adventureId,
            userId: tempUser._id,
            status: 'invited',
        }));

        return this.InvitationModel.insertMany(invitations);
    }

    async updateInvitationStatus(
        userId: Types.ObjectId,
        invitationId: Types.ObjectId,
        status: string,
    ): Promise<Invitation | null> {
        const invitation = await this.InvitationModel.findOneAndUpdate(
            { _id: invitationId, userId },
            { status },
            { new: true },
        ).exec();

        if (invitation && status === 'accepted') {
            this.AdventureService.addUser(invitation.adventureId, userId);
        }
        return invitation;
    }
}
