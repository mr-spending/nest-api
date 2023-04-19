import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SpendingService } from './spending.service';
import { SpendingController } from './spending.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { Spending, SpendingSchema } from './schema/spending.schema';
import { User, UserSchema } from '../user/schema/user.schema';

@Module({
  imports: [
    FirebaseModule,
    MongooseModule.forFeature([
      { name: Spending.name, schema: SpendingSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [SpendingController],
  providers: [SpendingService],
  exports: [SpendingService],
})
export class SpendingModule {}
