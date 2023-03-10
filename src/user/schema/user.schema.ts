import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ _id: false })
export class MonoBankAccount {
  @Prop({ type: String, required: true })
  type: string;
  @Prop({ type: Number, required: true })
  currencyCode: number;
  @Prop({ type: String, required: true })
  id: string;
  @Prop({ type: [String], required: true })
  maskedPan: string[];
}
const MonoBankAccountSchema = SchemaFactory.createForClass(MonoBankAccount);

@Schema()
export class User {
  @Prop({ type: String, required: true })
  id: string;
  @Prop({ type: String, required: true })
  email: string;
  @Prop({ type: String, required: false })
  displayName?: string;
  @Prop({ type: String, required: false })
  photoURL?: string;
  @Prop({ type: Boolean, required: true })
  emailVerified: boolean;
  @Prop({ type: String, required: false })
  currency?: string;
  @Prop({ type: String, required: false })
  currencyId?: string;
  @Prop({ type: String, required: false })
  monoBankClientToken?: string;
  @Prop({
    type: [MonoBankAccountSchema],
    required: false,
  })
  monoBankAccounts?: MonoBankAccount[];
  @Prop({ type: String, required: false })
  displayLanguage?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
