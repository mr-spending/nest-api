import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';
import { Categories } from './schema/categories.schema';

@ApiTags('Categories')
@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiResponse({ status: 200, type: [CategoryDto] })
  findAll(): Promise<Categories[]> {
    return this.categoriesService.findAll();
  }
}
