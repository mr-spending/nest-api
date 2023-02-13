import { Injectable } from '@nestjs/common';
import { CreateMonobankDto } from './dto/create-monobank.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { Monobank, MonobankDocument } from './schema/monobank.schema';
import { GetSpendingsQueryDto } from '../spending/dto/spending.dto';

@Injectable()
export class MonobankService {
  constructor(
    @InjectModel(Monobank.name) private monobankModel: Model<MonobankDocument>,
    private readonly userService: UserService,
  ) {}
  async create(createMonobankDto: CreateMonobankDto) {
    if (createMonobankDto.data.statementItem.amount > 0) return;
    await new this.monobankModel(createMonobankDto).save();
    return;
  }

  async getTransactions(userId: string, params?: GetSpendingsQueryDto) {
    const accounts = (
      await this.userService.findOne(userId)
    ).monoBankAccounts.map((account) => account.id);

    const data = (await this.monobankModel.find().exec())
      ?.filter((transaction) => accounts?.includes(transaction.data.account))
      .filter((item) =>
        params?.startDate
          ? item.data.statementItem.time >= +params.startDate &&
            item.data.statementItem.time <= +params.endDate
          : true,
      );

    return data.length ? data : [];
  }
}
