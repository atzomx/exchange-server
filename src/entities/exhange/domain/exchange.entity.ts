import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { prop } from "@typegoose/typegoose";
import { IExchageStatus, IExchageType } from "./exhange.enum";

@ObjectType()
class Exchange {
  @Field(() => ID)
  readonly _id?: Types.ObjectId;

  @Field(() => String)
  @prop({ required: true })
  readonly seller?: Types.ObjectId;

  @Field(() => String)
  @prop({ required: true })
  readonly buller?: Types.ObjectId;

  @Field(() => String)
  @prop({ required: true })
  public code!: string;

  @Field(() => IExchageStatus)
  @prop({ required: true, default: IExchageStatus.pending })
  public status!: IExchageStatus;

  @Field(() => IExchageType)
  @prop({ required: true })
  public type!: IExchageStatus;

  @Field(() => String)
  @prop()
  public description?: string;

  @Field(() => String)
  @prop()
  public indications?: string;

  @Field(() => Number)
  @prop({ required: true })
  public amount!: number;

  @Field(() => Number)
  @prop({ required: true })
  public share!: number;
}

export default Exchange;
