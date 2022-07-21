import { PaginateArgs } from "@core/infrastructure/responses";
import { Types } from "mongoose";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class ShippingPaginateArgs extends PaginateArgs {
  @Field(() => String, { nullable: true })
  public exchangeId?: Types.ObjectId;
}

export default {
  ShippingPaginateArgs,
};
