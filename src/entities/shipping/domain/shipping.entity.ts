import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { prop } from "@typegoose/typegoose";

@ObjectType()
class Shipping {
  @Field(() => ID, { description: "Shipping identifier." })
  readonly _id?: Types.ObjectId;

  @Field(() => String, { description: "Exchange identifier." })
  @prop({ required: true })
  readonly exchangeId!: Types.ObjectId;

  @Field({ description: "Shipping origin." })
  @prop({ required: true })
  public origin!: string;

  @Field({ description: "Shipping destination." })
  @prop({ required: true })
  public destination!: string;

  @Field({ description: "Shipping binnacle." })
  @prop({ required: true })
  public binnacle!: string;

  @Field({ description: "Shipping tracking guide." })
  @prop({ required: true })
  public trackingGuide!: string;

  @Field({ description: "Shipping status." })
  @prop({ required: true })
  public status!: string;
}

export default Shipping;
