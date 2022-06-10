import { prop } from "@typegoose/typegoose";
import { ObjectId } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { IUserGender, IUserStatus } from "./user.enums";
@ObjectType()
class User {
  @Field(() => ID)
  readonly id?: string | ObjectId;

  @Field()
  @prop({ required: true })
  public firstName!: string;

  @Field()
  @prop({ required: true })
  public lastName!: string;

  @Field()
  @prop({ required: true })
  public secondLastName?: string;

  @Field()
  @prop({ required: false, index: 1 })
  public normalizedFullName?: string;

  @Field()
  @prop({ required: true })
  public image?: string;

  @Field()
  @prop({ required: true, unique: true })
  public curp!: string;

  @Field(() => IUserGender)
  @prop({ required: true, enum: IUserGender })
  public gender!: IUserGender;

  @Field()
  @prop({ required: true })
  public birthday!: Date;

  @Field()
  @prop({ required: true })
  public phoneNumber!: string;

  @Field()
  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @Field()
  @prop({ required: true, unique: true })
  public userName!: string;

  @Field(() => IUserStatus)
  @prop({ required: true, enum: IUserStatus })
  public status!: string;
}

export default User;
