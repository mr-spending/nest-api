import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';

import { GetSpendingsQueryDto, SpendingDto } from './dto/spending.dto';
import { UpdateSpendingDto } from './dto/update-spending.dto';
import { FirebaseService } from '../firebase/firebase.service';
import { sortArrayByProperty, throwNewError } from '../utils/helper.functions';
import { plainToClass } from 'class-transformer';
import { DirectionEnum, SortFieldEnum } from '../shared/enums/enums';

@Injectable()
export class SpendingService {
  private store: firebase.firestore.Firestore;
  constructor(private firebaseApp: FirebaseService) {
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

  async findAll(
    userId: string,
    params?: GetSpendingsQueryDto,
  ): Promise<SpendingDto[]> {
    const spendings = [];
    (await this.store.collection('spending').get()).docs
      .filter((data) => data.get('userId') === userId)
      .filter((data) =>
        !params.startDate
          ? true
          : +params.startDate <= data.get('time') &&
            data.get('time') <= +params.endDate,
      )
      .map((data) => {
        spendings.push(data.data());
      });
    return sortArrayByProperty(
      spendings,
      SortFieldEnum.Time,
      DirectionEnum.Descending,
    );
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
