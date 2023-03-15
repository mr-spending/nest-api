import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './schema/user.schema';
import { CategoryDto } from '../categories/dto/category.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

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
    // return await this.userModel.findOne({ id }).exec();
    return await this.userModel.findOneAndUpdate({ id }, updatedUser).exec();
  }
}
