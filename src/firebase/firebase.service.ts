import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import firebaseConfig from './firebase-config';
import { of } from 'rxjs';

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

  firestore = (): any => {
    return of();
    // return this.firebaseApp.firestore();
  };
}
