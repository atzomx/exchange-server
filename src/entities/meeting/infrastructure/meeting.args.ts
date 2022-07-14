import { PaginateArgs } from "@core/infrastructure/responses";
import { Types } from "mongoose";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class MeetingPaginateArgs extends PaginateArgs {
  @Field(() => String, { nullable: true })
  public exchangeId?: Types.ObjectId;
}

export default {
  MeetingPaginateArgs,
};
