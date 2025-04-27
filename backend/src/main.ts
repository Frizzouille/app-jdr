import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Autoriser le frontend (localhost:8081) à accéder à l'API
    app.enableCors({
        origin: 'http://localhost:8081', // Remplace cette URL par celle de ton frontend
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Autoriser les méthodes HTTP nécessaires
        allowedHeaders: 'Content-Type, Authorization', // Autoriser certains headers
    });

    await app.listen(3000);
}
bootstrap();
