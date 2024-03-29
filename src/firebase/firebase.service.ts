import { Injectable } from '@nestjs/common';

import * as firebase from 'firebase-admin';
import firebaseConfig from './firebase-config';

@Injectable()
export class FirebaseService {
  private firebaseApp: firebase.app.App;

  constructor() {
    this.firebaseApp = firebase.initializeApp({
      credential: firebase.credential.cert({ ...firebaseConfig }),
      databaseURL: firebaseConfig.databaseUrl,
    });
  }

  getAuth = (): firebase.auth.Auth => {
    return this.firebaseApp.auth();
  };

  deleteUser(id: string): Promise<any> {
    return this.getAuth().deleteUser(id);
  }
}
