import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { prop } from "@typegoose/typegoose";

@ObjectType()
class Shipping {
  @Field(() => ID)
  readonly _id?: Types.ObjectId;

  @Field(() => String)
  @prop({ required: true })
  readonly exchangeId!: Types.ObjectId;

  @Field()
  @prop({ required: true })
  public origin!: string;

  @Field()
  @prop({ required: true })
  public destination!: string;

  @Field()
  @prop({ required: true })
  public binnacle!: string;

  @Field()
  @prop({ required: true })
  public trackingGuide!: string;

  @Field()
  @prop({ required: true })
  public status!: string;
}

export default Shipping;
