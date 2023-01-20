import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PreAuthMiddleware } from './firebase/pre-auth.middleware';
import { SpendingModule } from './spending/spending.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [FirebaseModule, SpendingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(PreAuthMiddleware).forRoutes({
      path: '/*',
      method: RequestMethod.ALL,
    });
  }
}
