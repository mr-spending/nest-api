import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MonoBankService } from './mono-bank.service';
import { MonoBankController } from './mono-bank.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { Spending, SpendingSchema } from '../spending/schema/spending.schema';
import { User, UserSchema } from '../user/schema/user.schema';

@Module({
  imports: [
    FirebaseModule,
    MongooseModule.forFeature([
      { name: Spending.name, schema: SpendingSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [MonoBankController],
  providers: [MonoBankService],
})
export class MonoBankModule {}
