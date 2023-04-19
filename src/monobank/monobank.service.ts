import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Guid } from 'typescript-guid';
const moment = require('moment');

import { CreateMonobankDto } from './dto/create-monobank.dto';
import { SpendingDto } from '../spending/dto/spending.dto';
import { Spending, SpendingDocument } from '../spending/schema/spending.schema';
import { SpendingStatusEnum } from '../shared/enums/enums';
import { User, UserDocument } from '../user/schema/user.schema';

@Injectable()
export class MonobankService {
  constructor(
    @InjectModel(Spending.name) private spendingModel: Model<SpendingDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(monoTransaction: CreateMonobankDto): Promise<any> {
    const statementItem = monoTransaction.data.statementItem;
    const isTransactionAdded = await this.spendingModel
      .find({ bankId: statementItem.id })
      .exec();
    if (
      isTransactionAdded.length ||
      monoTransaction.data.statementItem.amount > 0
    )
      return;
    const user = await this.userModel
      .findOne(
        { 'monoBankAccounts.id': monoTransaction.data.account },
        { id: 1 },
      )
      .exec();
    if (!user) return;
    const spending = {
      bankId: statementItem.id,
      accountId: monoTransaction.data.account,
      amount: Math.abs(statementItem.amount),
      time: statementItem.time,
      categoryId: '63e3ca87631b20b10e81bcab',
      description: statementItem?.comment
        ? statementItem.description + ' ' + statementItem.comment
        : statementItem.description,
      date: moment(statementItem.time * 1000).format('YYYY-MM-DD HH:mm:ss'),
      currencyCode: statementItem.currencyCode,
      userId: user.id,
      id: Guid.create().toString(),
      status: SpendingStatusEnum.Pending,
    } as SpendingDto;
    return await new this.spendingModel(spending).save();
  }

  async getTransactions(userId: string) {
    const user = await this.userModel.findOne({ id: userId }).exec();
    const accounts = user.monoBankAccounts.map((account) => account.id);
    if (!accounts.length) return [];
    const data = (await this.spendingModel.find().exec())?.filter(
      (transaction) => accounts?.includes(transaction.accountId),
    );
    return data.length ? data : [];
  }
}
