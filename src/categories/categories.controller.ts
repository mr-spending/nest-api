import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Categories } from './schema/categories.schema';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll(): Promise<Categories[]> {
    return this.categoriesService.findAll();
  }
}
