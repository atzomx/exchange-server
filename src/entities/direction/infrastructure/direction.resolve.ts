import {
  ValidateArgs,
  ValidateIdentifier,
} from "@core/infrastructure/decorators";
import NamerUtils from "@core/infrastructure/utils/namer.utils";
import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import DirectionController from "../application/direction.controller";
import Direction from "../domain/direction.entity";
import { DirectionPaginationArgs } from "./direction.args";
import { DirectionInputCreate, DirectionInputUpdate } from "./direction.inputs";
import { DirectionPaginateResponse } from "./direction.response";

const NAMES = NamerUtils.get("direction");

@Resolver(Direction)
class DirectionResolver {
  private controller: DirectionController;

  constructor() {
    this.controller = new DirectionController();
  }

  @Query(() => Direction, {
    description: "Returns one direction by id.",
    name: NAMES.find,
  })
  async findById(@Arg("id") id: string): Promise<Direction> {
    const user = await this.controller.findById(id);
    return user;
  }

  @Query(() => DirectionPaginateResponse, {
    description: "Returns an array of direction.",
    name: NAMES.paginate,
  })
  async paginate(@Args() data: DirectionPaginationArgs) {
    const results = await this.controller.paginate(data);
    return results;
  }

  @Mutation(() => Direction, {
    description: "Register a new direction.",
    name: NAMES.create,
  })
  @ValidateArgs(DirectionInputCreate, "data")
  async create(@Arg("data") direction: DirectionInputCreate) {
    const result = await this.controller.create(direction);
    return result;
  }

  @Mutation(() => Direction, {
    description: "Update an existing direction by id.",
    name: NAMES.update,
  })
  @ValidateIdentifier(DirectionInputUpdate, "id")
  @ValidateArgs(DirectionInputUpdate, "data")
  async update(
    @Arg("id") id: string,
    @Arg("data") direction: DirectionInputUpdate,
  ) {
    const result = await this.controller.update(id.toString(), direction);
    return result;
  }
}

export default DirectionResolver;
