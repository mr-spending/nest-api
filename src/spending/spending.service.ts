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
      date: moment(time * 1000).format('YYYY-MM-DD'),
      id: Guid.create().toString(),
      status: SpendingStatusEnum.Accepted,
    } as SpendingDto;
    return await new this.spendingModel(spending).save();
  }

  async findAll(userId: string, params?: GetSpendingQueryDto): Promise<Spending[]> {
    const query = { userId };
    if (params) Object.assign(query, { time: { $gte: +params.startDate, $lte: +params.endDate } });
    return this.spendingModel.find(query).exec();
  }

  async update(id: string, updateSpendingDto: SpendingDto, userId: string): Promise<Spending> {
    return await this.spendingModel
      .findOneAndUpdate({ id, userId }, updateSpendingDto)
      .exec();
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.spendingModel.findOneAndUpdate({ id, userId }, {
      status: SpendingStatusEnum.Rejected,
      removalTime: Math.floor(new Date().getTime() / 1000)
    }).exec();
  }
}
