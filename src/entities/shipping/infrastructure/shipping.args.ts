import { PaginateArgs } from "@core/infrastructure/responses";
import { Types } from "mongoose";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class ShippingPaginationArgs extends PaginateArgs {
  @Field(() => String, {
    nullable: true,
    description: "Exchange identifier on Shipping.",
  })
  public exchangeId?: Types.ObjectId;
}
