import { Module } from '@nestjs/common';
import { MonobankService } from './monobank.service';
import { MonobankController } from './monobank.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Monobank, MonobankSchema } from './schema/monobank.schema';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    FirebaseModule,
    MongooseModule.forFeature([
      { name: Monobank.name, schema: MonobankSchema },
    ]),
    UserModule,
  ],
  controllers: [MonobankController],
  providers: [MonobankService],
})
export class MonobankModule {}
