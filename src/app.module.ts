import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';

import { PreAuthMiddleware } from './middleware/pre-auth.middleware';
import { SpendingModule } from './spending/spending.module';
import { FirebaseModule } from './firebase/firebase.module';
import { UserModule } from './user/user.module';
import { MonoBankModule } from './monobank/mono-bank.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { mongoDbUri, sendGridParams } from '../settings/main.settings';
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
    MailerModule.forRoot({
      transport: {
        host: sendGridParams.host,
        auth: {
          user: sendGridParams.user,
          pass: sendGridParams.pass,
        },
      }
    }),
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
          method: RequestMethod.ALL,
        },
      )
      .forRoutes({
        path: '/*',
        method: RequestMethod.ALL,
      });
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
