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
  public estate!: string;

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
  public outdoorNumber!: string;

  @Field()
  @prop({ required: true })
  public zipCode!: Date;

  @Field()
  @prop({ required: true })
  public extraIndications!: string;

  @Field()
  @prop({ required: false, index: 1 })
  public normalizedFullDirection?: string;
}

export default Direction;