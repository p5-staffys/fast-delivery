import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('FastDelivery')
    .setDescription('Api created by Staffy')
    .setVersion('1.0')
    .addTag('API FastDelivery')
    .addSecurity('idToken', {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
};
