import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
    next()
  })
  app.use(cookieParser())
  app.enableCors({
    credentials: true,
    origin: process.env.WEB_URL as string
  })

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
