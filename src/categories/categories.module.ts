import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { MongooseModule } from '@nestjs/mongoose';
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
