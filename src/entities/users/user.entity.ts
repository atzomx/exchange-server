import { prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import { ObjectId } from "mongoose";
import { IUserGender } from "./user.enums";

@ObjectType()
class User {
  @Field(() => ID)
  readonly _id!: ObjectId;

  @Field()
  @prop({ required: true })
  public firstName!: string;

  @Field()
  @prop({ required: true })
  public lastName!: string;

  @Field()
  @prop({ required: true })
  public secondLastName!: string;

  @Field()
  @prop({ required: true })
  public normalizedFullName!: string;

  @Field()
  @prop({ required: true })
  public curp!: string;

  @Field(() => IUserGender)
  @prop({ required: true, enum: IUserGender })
  public gender!: IUserGender;

  @Field()
  @prop({ required: true })
  public birthday!: Date;
}

export default User;
