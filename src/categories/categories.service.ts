import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categories, CategoriesDocument } from './schema/categories.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories.name)
    private categoriesModel: Model<CategoriesDocument>,
  ) {}

  async findAll(): Promise<Categories[]> {
    return await this.categoriesModel.find().exec();
  }
}
