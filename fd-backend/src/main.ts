import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import cookieParser from 'cookie-parser';
import { setupSwagger } from './devModules/common/swagger/swagger';
import { setupSecurity } from './config/security/security';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  setupSecurity(app);

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: 422,
    }),
  );

  setupSwagger(app);

  await app.listen(configService.get<number>('PORT'));

  console.info(
    `Server is running in port ${configService.get<number>('PORT')}`,
  );
  // Only here you can acces to process.env, also check ConfigServices Instances
}
bootstrap();
