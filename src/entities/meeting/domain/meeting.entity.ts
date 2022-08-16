import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { prop } from "@typegoose/typegoose";

@ObjectType()
class Meeting {
  @Field(() => ID, { description: "Meeting identifier." })
  readonly _id?: Types.ObjectId;

  @Field(() => String, { description: "Exchange identifier." })
  @prop({ required: true })
  readonly exchangeId!: Types.ObjectId;

  @Field({ description: "Meeting date." })
  @prop({ required: true })
  public date!: Date;

  @Field({ description: "Meeting place." })
  @prop({ required: true })
  public place!: string;

  @Field({ description: "Meeting binnacle." })
  @prop({ required: true })
  public binnacle!: string;

  @Field({ description: "Meeting status." })
  @prop({ required: true })
  public status!: string;
}

export default Meeting;
