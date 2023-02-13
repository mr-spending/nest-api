import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MonobankDocument = HydratedDocument<Monobank>;

@Schema({ _id: false })
export class StatementItem {
  @Prop({ type: String, required: true })
  id: string;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: Number, required: true })
  time: number;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  currencyCode: number;
}
const StatementItemSchema = SchemaFactory.createForClass(StatementItem);

@Schema({ _id: false })
export class MonoBankData {
  @Prop({ type: String, required: true })
  account: string;

  @Prop({ type: StatementItem, required: true })
  statementItem: StatementItem;
}
const MonoBankDataSchema = SchemaFactory.createForClass(MonoBankData);

@Schema({ collection: 'bufferMonobank' })
export class Monobank {
  @Prop({ type: MonoBankData, required: true })
  data: MonoBankData;

  @Prop({ type: String, required: true })
  type: string;
}

export const MonobankSchema = SchemaFactory.createForClass(Monobank).set(
  'toJSON',
  {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  },
);
