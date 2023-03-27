import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { User, UserSchema } from './schema/user.schema';
import { Spending, SpendingSchema } from '../spending/schema/spending.schema';

@Module({
  imports: [
    FirebaseModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Spending.name, schema: SpendingSchema }
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
