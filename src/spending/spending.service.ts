import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';

import { GetSpendingsQueryDto, SpendingDto } from './dto/spending.dto';
import { UpdateSpendingDto } from './dto/update-spending.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Spending, SpendingDocument } from './schema/spending.schema';

@Injectable()
export class SpendingService {
  private store: firebase.firestore.Firestore;

  constructor(
    @InjectModel(Spending.name) private spendingModel: Model<SpendingDocument>,
  ) {}

  async create(
    createSpendingDto: SpendingDto,
    userId: string,
  ): Promise<Spending> {
    createSpendingDto = { ...createSpendingDto, userId };
    return await new this.spendingModel(createSpendingDto).save();
  }

  async findAll(
    userId: string,
    params?: GetSpendingsQueryDto,
  ): Promise<Spending[]> {
    const data = await this.spendingModel.find({ userId });
    return data.filter(
      (item) => item.time >= +params.startDate && item.time <= +params.endDate,
    );
  }

  async update(
    id: string,
    updateSpendingDto: UpdateSpendingDto,
    userId: string,
  ): Promise<Spending> {
    return await this.spendingModel
      .findOneAndUpdate({ _id: id, userId }, updateSpendingDto)
      .exec();
  }

  async remove(id: string, userId: string): Promise<any> {
    return await this.spendingModel
      .findOneAndRemove({ _id: id, userId })
      .exec();
  }
}
