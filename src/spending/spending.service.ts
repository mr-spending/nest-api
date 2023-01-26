import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';

import { SpendingDto } from './dto/spending.dto';
import { UpdateSpendingDto } from './dto/update-spending.dto';
import { FirebaseService } from '../firebase/firebase.service';
import { throwNewError } from '../utils/helper.functions';
import { plainToClass } from 'class-transformer';

@Injectable()
export class SpendingService {
  private auth: firebase.auth.Auth;
  private store: firebase.firestore.Firestore;
  constructor(private firebaseApp: FirebaseService) {
    this.auth = firebaseApp.getAuth();
    this.store = firebaseApp.firestore();
  }
  async create(
    createSpendingDto: SpendingDto,
    userId: string,
  ): Promise<SpendingDto> {
    const payload: SpendingDto = { ...createSpendingDto, userId };
    await this.store
      .collection('spending')
      .doc(createSpendingDto.id)
      .set(payload);
    return createSpendingDto;
  }

  async findAll(userId: string): Promise<SpendingDto[]> {
    const spendings = [];
    (await this.store.collection('spending').get()).docs
      .filter((data) => data.get('userId') === userId)
      .map((data) => {
        spendings.push(data.data());
      });
    return spendings;
  }

  async findOne(id: string, userId: string): Promise<SpendingDto> {
    const result = (
      await this.store.collection('spending').doc(id).get()
    ).data();
    return result['userId'] === userId
      ? plainToClass(SpendingDto, result)
      : throwNewError();
  }

  async update(
    id: string,
    updateSpendingDto: UpdateSpendingDto,
    userId: string,
  ): Promise<SpendingDto> {
    const result = (
      await this.store.collection('spending').doc(id).get()
    ).data();
    result['userId'] === userId
      ? await this.store
          .collection('spending')
          .doc(id)
          .update(updateSpendingDto)
      : throwNewError();
    return this.findOne(id, updateSpendingDto.userId);
  }

  async remove(id: string, userId: string): Promise<void> {
    const result = (
      await this.store.collection('spending').doc(id).get()
    ).data();
    result['userId'] === userId
      ? await this.store.collection('spending').doc(id).delete()
      : throwNewError();
  }
}
