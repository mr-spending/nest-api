import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { Guid } from 'typescript-guid';

import { Spending, SpendingDocument } from './schema/spending.schema';
import { GetSpendingQueryDto, SpendingDto } from './dto/spending.dto';
import { User, UserDocument } from '../user/schema/user.schema';
import { SpendingStatusEnum } from '../shared/enums/enums';

@Injectable()
export class SpendingService {

  constructor(
    @InjectModel(Spending.name) private spendingModel: Model<SpendingDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) { }

  async create(createSpendingDto: SpendingDto, userId: string): Promise<Spending> {
    const time = Math.floor(new Date().getTime() / 1000);
    const spending = {
      ...createSpendingDto,
      userId,
      time,
      date: moment(time * 1000).format('YYYY-MM-DD HH:mm:ss'),
      id: Guid.create().toString(),
      status: SpendingStatusEnum.Accepted,
    } as SpendingDto;
    return await new this.spendingModel(spending).save();
  }

  async findAll(userId: string, params?: GetSpendingQueryDto): Promise<Spending[]> {
    const query = { userId, status: SpendingStatusEnum.Accepted };
    if (params) Object.assign(query, { time: { $gte: +params.startDate, $lte: +params.endDate } });
    return this.spendingModel.find(query).exec();
  }

  async findAllDeleted(userId: string): Promise<Spending[]> {
    return this.spendingModel.find({ userId, status: SpendingStatusEnum.Rejected }).exec();
  }

  async findAllPending(userId: string): Promise<Spending[]> {
    const user = await this.userModel.findOne({ id: userId }).exec();
    const accounts = user.monoBankAccounts.map(account => account.id);
    if (!accounts.length) return [];
    const data = (await this.spendingModel.find({ userId, status: SpendingStatusEnum.Pending })
      .exec())?.filter(transaction => accounts?.includes(transaction.accountId));
    return data.length ? data : [];
  }

  async update(id: string, updateSpendingDto: SpendingDto, userId: string): Promise<Spending> {
    return await this.spendingModel
      .findOneAndUpdate({ id, userId }, updateSpendingDto)
      .exec();
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.spendingModel.findOneAndUpdate({ id, userId }, {
      status: SpendingStatusEnum.Rejected,
      removalTime: Math.floor(new Date().getTime() / 1000)
    }).exec();
  }

  async hardDelete(id: string, userId: string): Promise<void> {
    await this.spendingModel.remove({ id, userId }).exec();
  }

  async hardDeleteAllRejected(userId: string): Promise<void> {
    await this.spendingModel.remove({ userId, status: SpendingStatusEnum.Rejected }).exec();
  }
}
