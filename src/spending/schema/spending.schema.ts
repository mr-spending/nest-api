import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type SpendingDocument = HydratedDocument<Spending>;

@Schema({ collection: 'spending' })
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

  @Prop({ type: Number, required: false })
  currencyCode: number;

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
