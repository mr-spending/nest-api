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
    // {
    //   type: 'StatementItem',
    //     data: {
    //   account: 'uIMmOh8y9X8j26TTDeMBbQ',
    //     statementItem: {
    //     id: 'bwHBTrvHBR01n8P_',
    //       time: 1674810855,
    //       description: 'Юра Ковальов',
    //       mcc: 4829,
    //       originalMcc: 4829,
    //       amount: -100,
    //       operationAmount: -100,
    //       currencyCode: 980,
    //       commissionRate: 0,
    //       cashbackAmount: 0,
    //       balance: 2382425,
    //       hold: true,
    //       receiptId: 'K442-1M9M-C019-2BHE'
    //   }
    // }
    // }
    console.log(createMonobankDto);
    return await this.store
      .collection('bufferMonobank')
      .doc(createMonobankDto.data.statementItem.id)
      .set(createMonobankDto);
  }
}
