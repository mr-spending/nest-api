import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoriesDocument = HydratedDocument<Categories>;

@Schema({ _id: false })
export class Icon {
  @Prop({ type: String, required: true })
  iconType: string;
  @Prop({ type: String, required: true })
  background: string;
}
const IconSchema = SchemaFactory.createForClass(Icon);

@Schema()
export class Categories {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: IconSchema, required: true })
  icon: Icon;
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories).set(
  'toJSON',
  {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  },
);
