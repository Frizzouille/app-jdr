import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

if (!process.env.MONGODB_USER || !process.env.MONGODB_PASSWORD) {
    throw new Error('MONGODB_USER and MONGODB_PASSWORD must be defined');
}

const user = encodeURIComponent(process.env.MONGODB_USER);
const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
const uri = `mongodb+srv://${user}:${password}@cluster0.jwl0m7q.mongodb.net/app-jdr`;

@Module({
    imports: [MongooseModule.forRoot(uri)],
})
export class DatabaseModule {}
