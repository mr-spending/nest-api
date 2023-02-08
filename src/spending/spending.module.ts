import { Module } from '@nestjs/common';
import { SpendingService } from './spending.service';
import { SpendingController } from './spending.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Spending, SpendingSchema } from './schema/spending.schema';

@Module({
  imports: [
    FirebaseModule,
    MongooseModule.forFeature([{ name: Spending.name, schema: SpendingSchema }]),
  ],
  controllers: [SpendingController],
  providers: [SpendingService],
})
export class SpendingModule {}
