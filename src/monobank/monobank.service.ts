import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class MonobankService {
  private store: firebase.firestore.Firestore;
  constructor(private firebaseApp: FirebaseService) {
    this.store = firebaseApp.firestore();
  }
  async create(createMonobankDto: any) {
    return await this.store
      .collection('bufferMonobank')
      .doc(createMonobankDto.data.statementItem)
      .set(createMonobankDto);
  }
}
