import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CategoriesDocument = HydratedDocument<Categories>;

@Schema()
export class Icon {
  @Prop({ type: String, required: true })
  iconType: string;
  @Prop({ type: String, required: true })
  background: string;
}
SchemaFactory.createForClass(Icon);

@Schema()
export class Categories {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Icon', required: true }})
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
