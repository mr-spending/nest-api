import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Categories, CategoriesSchema } from '../../categories/schema/categories.schema';

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

@Schema({ _id: false })
export class Icon {
  @Prop({ type: String, required: true })
  iconType: string;
  @Prop({ type: String, required: true })
  background: string;
}
const IconSchema = SchemaFactory.createForClass(Icon);

@Schema()
export class UserCategories {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
  id: string;

  @Prop({ type: IconSchema, required: true })
  icon: Icon;
}
const UserCategoriesSchema = SchemaFactory.createForClass(Categories).set(
  'toJSON',
  {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  },
);

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

  @Prop({ type: [MonoBankAccountSchema], required: false })
  monoBankAccounts?: MonoBankAccount[];

  @Prop({ type: [UserCategoriesSchema], required: false })
  categories?: UserCategories[];

  @Prop({ type: String, required: false })
  displayLanguage?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
