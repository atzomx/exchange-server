import { prop } from "@typegoose/typegoose";
import { ObjectId } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
class Direction {
  @Field(() => ID)
  readonly id?: ObjectId;

  @Field()
  @prop({ required: true })
  public nameDirection!: string;

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
  public zipCode!: number;

  @Field()
  @prop({ required: false })
  public extraIndications?: string;

  @Field()
  @prop({ required: false, index: 1 })
  public normalizedFullDirection?: string;
}

export default Direction;
