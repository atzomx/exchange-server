import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { index, prop } from "@typegoose/typegoose";

@index({ owner: 1, name: 1 }, { unique: true })
@ObjectType()
class Direction {
  @Field(() => ID)
  readonly _id?: Types.ObjectId;

  @Field(() => String)
  @prop({ required: true })
  readonly owner!: Types.ObjectId;

  @Field()
  @prop({ required: true })
  public name!: string;

  @Field()
  @prop({ required: true })
  public state!: string;

  @Field()
  @prop({ required: true })
  public town!: string;

  @Field()
  @prop({ required: true })
  public neighborhood!: string;

  @Field()
  @prop({ required: true })
  public street!: string;

  @Field()
  @prop({ required: true })
  public outdoorNumber!: number;

  @Field()
  @prop({ required: true })
  public zipCode!: string;

  @Field()
  @prop({ required: false })
  public extraIndications?: string;

  @Field()
  @prop({ required: false, index: 1 })
  public normalizedFullDirection?: string;
}

export default Direction;
