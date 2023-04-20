import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { iconSwagger } from '../swagger-src/icon';
import { SocketIoAdapter } from './web-sockets/socket-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.useWebSocketAdapter(new SocketIoAdapter(app));

  const config = new DocumentBuilder()
    .setTitle('Spending app')
    .setDescription('The spending API description')
    .setVersion('1.0dev')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document
    , {
    customfavIcon: iconSwagger,
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.0/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.0/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.0/swagger-ui.css',
    ],
  }
  );
  
  await app.listen(3500);
}
bootstrap();
