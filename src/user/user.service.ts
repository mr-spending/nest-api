import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './schema/user.schema';
import { CategoryDto } from '../categories/dto/category.dto';
import { UserDto } from './dto/user.dto';
import { SpendingService } from '../spending/spending.service';
import { SpendingDto } from '../spending/dto/spending.dto';

@Injectable()
export class UserService {
  @Inject(SpendingService) private readonly spendingService: SpendingService;

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(user: UserDto): Promise<User> {
    return await new this.userModel(user).save();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({ id }).exec();
  }

  async update(id: string, payload: UserDto): Promise<User> {
    return await this.userModel.findOneAndUpdate({ id }, payload).exec();
  }

  async createCategory(id: string, payload: CategoryDto): Promise<User> {
    let updatedUser;
    await this.userModel.findOne({ id }).exec().then(user => {
      updatedUser = {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        monoBankClientToken: user.monoBankClientToken,
        monoBankAccounts: user.monoBankAccounts,
        displayLanguage: user.displayLanguage,
        categories: [...user.categories, payload]
      }
    })
    return await this.userModel.findOneAndUpdate({ id }, updatedUser).exec();
  }

  // async findAllCategories(id: string) {
  //   let categories: CategoryDto[] = [];
  //   await this.userModel.findOne({ id }).exec().then(user => {
  //     categories = user.categories as CategoryDto[];
  //   })
  //   return categories;
  // }

  async updateCategory(payload: CategoryDto, id: string) {
    let updatedUser;
    await this.userModel.findOne({ id }).exec().then(user => {
      const categoryIdx = user.categories.findIndex(item => item.id === payload.id);
      const updatedCategories = [...user.categories];
      updatedCategories[categoryIdx] = payload;
      updatedUser = {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        monoBankClientToken: user.monoBankClientToken,
        monoBankAccounts: user.monoBankAccounts,
        displayLanguage: user.displayLanguage,
        categories: updatedCategories
      }
    })
    return await this.userModel.findOneAndUpdate({ id }, updatedUser).exec();
  }

  async removeCategory(categoryId: string, userId: string) {
    let updatedUser;
    await this.userModel.findOne({ id: userId }).exec().then(user => {
      const updatedCategories = user.categories.filter(item => item.id !== categoryId);
      updatedUser = {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        monoBankClientToken: user.monoBankClientToken,
        monoBankAccounts: user.monoBankAccounts,
        displayLanguage: user.displayLanguage,
        categories: updatedCategories
      }
    })
    await this.spendingService.findAll(userId).then(spending => spending.forEach(item => {
      if (item.categoryId === categoryId)
        this.spendingService.update((item as any)._id, { categoryId: '63e3ca87631b20b10e81bcab' } as SpendingDto, userId);

    }))
    return await this.userModel.findOneAndUpdate({ id: userId }, updatedUser).exec();
  }
}
