import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SpendingDocument = HydratedDocument<Spending>;

@Schema()
export class Spending {
  @Prop({ type: String, required: false })
  bankId: string;
  @Prop({ type: Number, required: true })
  amount: number;
  @Prop({ type: Number, required: true })
  time: number;

  @Prop({ type: String, required: false })
  categoryId: string;

  @Prop({ type: String, required: false })
  description: string;

  @Prop({ type: String, required: false })
  date: string;

  @Prop({ type: String, required: true })
  userId: string;
}

export const SpendingSchema = SchemaFactory.createForClass(Spending).set(
  'toJSON',
  {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  },
);
