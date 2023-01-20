import { Module } from '@nestjs/common';
import { SpendingService } from './spending.service';
import { SpendingController } from './spending.controller';
import { FirebaseService } from '../firebase/firebase.service';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [SpendingController],
  providers: [SpendingService],
})
export class SpendingModule {}
