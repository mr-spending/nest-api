import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Guid } from 'typescript-guid';

import { User, UserDocument } from './schema/user.schema';
import { CategoryDto, UserDto } from './dto/user.dto';
import { Spending, SpendingDocument } from '../spending/schema/spending.schema';
import { FirebaseService } from '../firebase/firebase.service';
import { categoriesConstant } from '../shared/constants/categories.constants';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Spending.name) private spendingModel: Model<SpendingDocument>,
    private firebaseApp: FirebaseService
  ) {}

  async create(user: UserDto): Promise<User> {
    return await new this.userModel({ ...user, categories: categoriesConstant }).save();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({ id }).exec();
  }

  async update(id: string, payload: UserDto): Promise<User> {
    return await this.userModel.findOneAndUpdate({ id }, payload).exec();
  }

  async delete(userId: string): Promise<void> {
    await this.userModel
      .deleteOne({ id: userId })
      .exec();
    await this.spendingModel
      .deleteMany({ userId })
      .exec();
    return await this.firebaseApp
      .deleteUser(userId);
  }

  async createCategory(id: string, payload: CategoryDto): Promise<User> {
    let updatedCategories;
    await this.userModel
      .findOne({ id })
      .exec()
      .then((user) => {
        updatedCategories = [
          ...user.categories,
          { ...payload, id: Guid.create().toString() },
        ];
      });
    return await this.userModel
      .findOneAndUpdate({ id }, { categories: updatedCategories })
      .exec();
  }

  async updateCategory(payload: CategoryDto, id: string) {
    let updatedCategories;
    await this.userModel
      .findOne({ id })
      .exec()
      .then((user) => {
        const categoryIdx = user.categories.findIndex(
          (item) => item.id === payload.id,
        );
        updatedCategories = [...user.categories];
        updatedCategories[categoryIdx] = payload;
      });
    return await this.userModel
      .findOneAndUpdate({ id }, { categories: updatedCategories })
      .exec();
  }

  async removeCategory(categoryId: string, userId: string) {
    let updatedCategories;
    await this.userModel
      .findOne({ id: userId })
      .exec()
      .then((user) => {
        updatedCategories = user.categories.filter(
          (item) => item.id !== categoryId,
        );
      });
    await this.spendingModel.find({ userId, categoryId }).then((spending) =>
      spending.forEach(async (item) => {
        await this.spendingModel.findOneAndUpdate(
          { id: item.id, userId },
          { categoryId: '63e3ca87631b20b10e81bcab' },
        );
      }),
    );
    return await this.userModel
      .findOneAndUpdate({ id: userId }, { categories: updatedCategories })
      .exec();
  }
}
