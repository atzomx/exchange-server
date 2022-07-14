import { Types } from "mongoose";
import { Field, InputType } from "type-graphql";
import { IExchageStatus, IExchageType } from "../domain/exhange.enum";

@InputType()
export class ExchangeInputCreate {
  @Field(() => String)
  public seller?: Types.ObjectId;

  @Field(() => String)
  public buller?: Types.ObjectId;

  @Field(() => IExchageStatus)
  public status!: IExchageStatus;

  @Field(() => IExchageType)
  public type!: IExchageStatus;

  @Field(() => String)
  public description?: string;

  @Field(() => String)
  public indications?: string;

  @Field(() => Number)
  public amount!: number;
}
