import {
  ValidateArgs,
  ValidateIdentifier,
} from "@core/infrastructure/decorators";
import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import MeetingController from "../application/meeting.controller";
import Meeting from "../domain/meeting.entity";
import { MeetingPaginateArgs } from "./meeting.args";
import { MeetingInputCreate, MeetingInputUpdate } from "./meeting.inputs";
import { MeetingPaginateResponse } from "./meeting.response";

@Resolver(Meeting)
class MeetingResolver {
  private controller: MeetingController;

  constructor() {
    this.controller = new MeetingController();
  }

  @Query(() => Meeting, { description: "Returns one meeting by id" })
  async meetingById(@Arg("id") id: string): Promise<Meeting> {
    const user = await this.controller.meetingById(id);
    return user;
  }

  @Query(() => MeetingPaginateResponse, {
    description: "Returns an array of meeting",
  })
  async meetingPaginate(@Args() data: MeetingPaginateArgs) {
    const results = await this.controller.meetingPaginate(data);
    return results;
  }

  @Mutation(() => Meeting)
  @ValidateArgs(MeetingInputCreate, "data")
  async meetingCreate(@Arg("data") meeting: MeetingInputCreate) {
    const result = await this.controller.meetingCreate(meeting);
    return result;
  }

  @Mutation(() => Meeting)
  @ValidateIdentifier(MeetingInputUpdate, "id")
  @ValidateArgs(MeetingInputUpdate, "data")
  async meetingUpdate(
    @Arg("id") id: string,
    @Arg("data") meeting: MeetingInputUpdate,
  ) {
    const result = await this.controller.meetingUpdate(id.toString(), meeting);
    return result;
  }
}

export default MeetingResolver;
