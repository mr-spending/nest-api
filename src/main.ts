import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import {
  listenPort,
  swaggerCustomOptions,
  swaggerDocumentConfig,
  swaggerPath,
} from '../settings/main.settings';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle(swaggerDocumentConfig.title)
    .setDescription(swaggerDocumentConfig.description)
    .setVersion(swaggerDocumentConfig.version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPath, app, document, swaggerCustomOptions);

  await app.listen(listenPort);
}
bootstrap();
