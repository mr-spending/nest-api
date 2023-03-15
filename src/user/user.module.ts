import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { User, UserSchema } from './schema/user.schema';
import { SpendingModule } from '../spending/spending.module';

@Module({
  imports: [
    FirebaseModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    SpendingModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
