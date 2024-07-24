import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      name: 'session',
      secret: '128h381h38',
      cookie: {
        secure: false,
      },
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(3333);
}
bootstrap();
