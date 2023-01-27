import { Module } from '@nestjs/common';
import { MonobankService } from './monobank.service';
import { MonobankController } from './monobank.controller';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [MonobankController],
  providers: [MonobankService],
})
export class MonobankModule {}
