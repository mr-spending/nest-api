import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { PreAuthMiddleware } from './middleware/pre-auth.middleware';
import { SpendingModule } from './spending/spending.module';
import { FirebaseModule } from './firebase/firebase.module';
import { UserModule } from './user/user.module';
import { MonoBankModule } from './monobank/mono-bank.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { mongoDbUri } from '../settings/main.settings';
import { DocumentsModule } from './documents/documents.module';

@Module({
  imports: [
    FirebaseModule,
    SpendingModule,
    UserModule,
    MonoBankModule,
    DocumentsModule,
    MongooseModule.forRoot(mongoDbUri),
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(PreAuthMiddleware)
      .exclude(
        {
          path: '/monobank',
          method: RequestMethod.ALL,
        },
        {
          path: '/api',
          method: RequestMethod.ALL,
        },
        {
          path: '/api/(.*)',
          method: RequestMethod.ALL,
        },
        {
          path: '/documents/(.*)',
          method: RequestMethod.GET,
        },
      )
      .forRoutes({
        path: '/*',
        method: RequestMethod.ALL,
      });
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
