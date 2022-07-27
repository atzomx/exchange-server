import {
  ValidateArgs,
  ValidateIdentifier,
} from "@core/infrastructure/decorators";
import NamerUtils from "@core/infrastructure/utils/namer.utils";
import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import MeetingController from "../application/meeting.controller";
import Meeting from "../domain/meeting.entity";
import { MeetingPaginateArgs } from "./meeting.args";
import { MeetingInputCreate, MeetingInputUpdate } from "./meeting.inputs";
import { MeetingPaginateResponse } from "./meeting.response";

const NAMES = NamerUtils.get("meeting");

@Resolver(Meeting)
class MeetingResolver {
  private controller: MeetingController;

  constructor() {
    this.controller = new MeetingController();
  }

  @Query(() => Meeting, {
    description: "Returns one meeting by id.",
    name: NAMES.find,
  })
  async meetingById(@Arg("id") id: string): Promise<Meeting> {
    const user = await this.controller.findById(id);
    const platano = "hola mundo";
    return user;
  }

  @Query(() => MeetingPaginateResponse, {
    description: "Returns an array of meetings.",
    name: NAMES.paginate,
  })
  async meetingPaginate(@Args() data: MeetingPaginateArgs) {
    const results = await this.controller.paginate(data);
    return results;
  }

  @Mutation(() => Meeting, {
    name: NAMES.create,
    description: "Register a new Meeting.",
  })
  @ValidateArgs(MeetingInputCreate, "data")
  async create(@Arg("data") meeting: MeetingInputCreate) {
    const result = await this.controller.create(meeting);
    return result;
  }

  @Mutation(() => Meeting, {
    name: NAMES.update,
    description: "Update a new Meeting.",
  })
  @ValidateIdentifier(MeetingInputUpdate, "id")
  @ValidateArgs(MeetingInputUpdate, "data")
  async update(
    @Arg("id") id: string,
    @Arg("data") meeting: MeetingInputUpdate,
  ) {
    const result = await this.controller.update(id.toString(), meeting);
    return result;
  }
}

export default MeetingResolver;
