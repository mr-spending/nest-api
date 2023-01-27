import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateMonobankDto } from './dto/create-monobank.dto';

@Injectable()
export class MonobankService {
  private store: firebase.firestore.Firestore;
  constructor(private firebaseApp: FirebaseService) {
    this.store = firebaseApp.firestore();
  }
  async create(createMonobankDto: CreateMonobankDto) {
    if (createMonobankDto.data.statementItem.amount > 0) return;
    await this.store
      .collection('bufferMonobank')
      .doc(createMonobankDto.data.statementItem.id)
      .set(createMonobankDto);
    return;
  }
}
