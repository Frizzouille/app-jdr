import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    private users = [
        {
            id: '1',
            email: 'quentingonel@gmail.com',
            password:
                '$2b$10$q/7aGLkJh9AR4UtdHqtS.ujSZLVUHiTcmeyx0IRVM16Df4LpZXrFW',
        },
        {
            id: '2',
            email: 'hugoorsell@live.com',
            password:
                '$2b$10$q/7aGLkJh9AR4UtdHqtS.ujSZLVUHiTcmeyx0IRVM16Df4LpZXrFW',
        },
    ];

    getUsers() {
        return this.users;
    }

    getUser(userId: string) {
        const user = this.users.find((u) => u.id === userId);
        if (!user) return null;

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}
