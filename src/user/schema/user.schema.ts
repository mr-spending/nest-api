import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class MonoBankAccount {
  @Prop({ type: Number, required: true })
  currencyCode: number;
  @Prop({ type: String, required: true })
  id: string;
  @Prop({ type: [String], required: true })
  maskedPan: string[];
  @Prop({ type: String, required: true })
  type: string;
}

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
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MonoBankAccount' }], required: false })
  monoBankAccounts?: MonoBankAccount[];
}

export const UserSchema = SchemaFactory.createForClass(User);
