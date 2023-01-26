import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import * as firebase from 'firebase-admin';
import { FirebaseService } from '../firebase/firebase.service';
import { throwNewError } from '../utils/helper.functions';
import { user } from 'firebase-functions/lib/v1/providers/auth';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  private store: firebase.firestore.Firestore;

  constructor(private firebaseApp: FirebaseService) {
    this.store = firebaseApp.firestore();
  }

  async create(user: UserDto): Promise<UserDto> {
    await this.store.collection('users').doc(user.id).set(user);
    const result = (
      await this.store.collection('users').doc(user.id).get()
    ).data();
    return plainToClass(UserDto, result);
  }

  async findOne(id: string, userId: string): Promise<UserDto> {
    const result = (await this.store.collection('users').doc(id).get()).data();
    return result['id'] === userId
      ? plainToClass(UserDto, result)
      : throwNewError();
  }
}
