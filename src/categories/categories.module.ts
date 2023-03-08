import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { Categories, CategoriesSchema } from './schema/categories.schema';

@Module({
  imports: [
    FirebaseModule,
    MongooseModule.forFeature([
      { name: Categories.name, schema: CategoriesSchema },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
