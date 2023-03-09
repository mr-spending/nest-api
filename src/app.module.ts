import { MiddlewareConsumer, Module, NestModule, RequestMethod, } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PreAuthMiddleware } from './firebase/pre-auth.middleware';
import { SpendingModule } from './spending/spending.module';
import { FirebaseModule } from './firebase/firebase.module';
import { CategoriesModule } from './categories/categories.module';
import { UserModule } from './user/user.module';
import { MonobankModule } from './monobank/monobank.module';


@Module({
  imports: [
    FirebaseModule,
    SpendingModule,
    CategoriesModule,
    UserModule,
    MonobankModule,
    MongooseModule.forRoot(
      'mongodb+srv://mrSpending:mrSpending@cluster0.ozrqavn.mongodb.net/mr-spending-db?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(PreAuthMiddleware)
      .exclude({
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
      })
      .forRoutes({
        path: '/*',
        method: RequestMethod.ALL,
      });
  }
}
