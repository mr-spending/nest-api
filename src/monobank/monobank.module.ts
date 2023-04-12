import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageGateway } from '../gateways/message.gateway';

import { MonobankService } from './monobank.service';
import { MonobankController } from './monobank.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { Spending, SpendingSchema } from '../spending/schema/spending.schema';
import { User, UserSchema } from '../user/schema/user.schema';

@Module({
  imports: [
    FirebaseModule,
    MongooseModule.forFeature([
      { name: Spending.name, schema: SpendingSchema },
      { name: User.name, schema: UserSchema }
    ]),
  ],
  controllers: [MonobankController],
  providers: [MonobankService, MessageGateway],
})
export class MonobankModule {}
