import { PaginateArgs } from "@core/infrastructure/responses";
import { Types } from "mongoose";
import { ArgsType, Field } from "type-graphql";

@ArgsType() 
export class MeetingPaginationArgs extends PaginateArgs {
 @Field(() => String, {
    nullable: true,
    description: "Exchange identifier on Meeting.",
  })
  public exchangeId?: Types.ObjectId;
}

export default {
  MeetingPaginationArgs,
};
