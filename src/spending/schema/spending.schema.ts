import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { SpendingStatusEnum } from '../../shared/enums/enums';

export type SpendingDocument = HydratedDocument<Spending>;

@Schema({ collection: 'spending' })
export class Spending {
  @Prop({ type: String, required: false })
  bankId: string;

  @Prop({ type: String, required: false })
  accountId: string;

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

  @Prop({ type: String, required: false })
  id: string;

  @Prop({ type: String, required: false })
  status: SpendingStatusEnum;

  @Prop({ type: Number, required: false })
  removalTime: number | undefined;

  @Prop({ type: Number, select: false })
  __v: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, select: false })
  _id: mongoose.Schema.Types.ObjectId;
}

export const SpendingSchema = SchemaFactory.createForClass(Spending);
