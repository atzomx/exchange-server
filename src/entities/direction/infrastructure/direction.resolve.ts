import {
  ValidateArgs,
  ValidateIdentifier,
} from "@core/infrastructure/decorators";
import { PaginateArgs } from "@core/infrastructure/responses";
import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import DirectionController from "../application/direction.controller";
import Direction from "../domain/direction.entity";
import { DirectionInputCreate, DirectionInputUpdate } from "./direction.inputs";
import { DirectionPaginateResponse } from "./direction.response";

@Resolver(Direction)
class DirectionResolver {
  private controller: DirectionController;

  constructor() {
    this.controller = new DirectionController();
  }

  @Query(() => Direction, { description: "Returns one direction by id" })
  async directionById(@Arg("id") id: string): Promise<Direction> {
    const user = await this.controller.directionById(id);
    return user;
  }

  @Query(() => DirectionPaginateResponse, {
    description: "Returns an array of direction",
  })
  async directionPaginate(@Args() { page, limit }: PaginateArgs) {
    const results = await this.controller.directionPaginate({ page, limit });
    return results;
  }

  @Mutation(() => Direction)
  @ValidateArgs(DirectionInputCreate, "data")
  async directionCreate(@Arg("data") direction: DirectionInputCreate) {
    const result = await this.controller.directionCreate(direction);
    return result;
  }

  @Mutation(() => Direction)
  @ValidateIdentifier(DirectionInputUpdate, "id")
  @ValidateArgs(DirectionInputUpdate, "data")
  async directionUpdate(
    @Arg("id") id: string,
    @Arg("data") direction: DirectionInputUpdate,
  ) {
    const result = await this.controller.directionUpdate(
      id.toString(),
      direction,
    );
    return result;
  }
}

export default DirectionResolver;
