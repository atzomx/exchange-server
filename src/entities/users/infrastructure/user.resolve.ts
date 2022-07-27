import {
  ValidateArgs,
  ValidateIdentifier,
} from "@core/infrastructure/decorators";
import { PaginateArgs } from "@core/infrastructure/responses";
import NamerUtils from "@core/infrastructure/utils/namer.utils";
import { AuthMiddleware } from "@entities/auth";
import {
  Arg,
  Args,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import UserController from "../application/user.controller";
import User from "../domain/user.entity";
import { UserInputCreate, UserInputUpdate } from "./user.inputs";
import { UserPaginateResponse } from "./user.response";

const NAMES = NamerUtils.get("user");

@Resolver(User)
class UserResolver {
  private controller: UserController;

  constructor() {
    this.controller = new UserController();
  }

  @Query(() => User, {
    description: "Returns one user by id",
    name: NAMES.find,
  })
  async findById(@Arg("id") id: string): Promise<User> {
    const user = await this.controller.findById(id);
    return user;
  }

  @Query(() => UserPaginateResponse, {
    description: "Returns an array of users.",
    name: NAMES.paginate,
  })
  async paginate(@Args() { page, limit }: PaginateArgs) {
    const results = await this.controller.paginate({ page, limit });
    return results;
  }

  @Mutation(() => User, {
    description: "Register a new user.",
    name: NAMES.create,
  })
  @ValidateArgs(UserInputCreate, "data")
  async create(@Arg("data") user: UserInputCreate) {
    const result = await this.controller.create(user);
    console.log("algo");
    return result;
  }

  @Mutation(() => User, {
    description: "Update an existing user by id.",
    name: NAMES.update,
  })
  @UseMiddleware(AuthMiddleware.IsAuth)
  @ValidateIdentifier(UserInputUpdate, "id")
  @ValidateArgs(UserInputUpdate, "data")
  async update(@Arg("id") id: string, @Arg("data") user: UserInputUpdate) {
    const result = await this.controller.update(id.toString(), user);
    return result;
  }
}

export default UserResolver;
