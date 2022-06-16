import {
  ValidateArgs,
  ValidateIdentifier,
} from "@core/infrastructure/decorators";
import { PaginateArgs } from "@core/infrastructure/responses";
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

@Resolver(User)
class UserResolver {
  private controller: UserController;

  constructor() {
    this.controller = new UserController();
  }

  @Query(() => User, { description: "Returns one user by id" })
  async userById(@Arg("id") id: string): Promise<User> {
    const user = await this.controller.userById(id);
    return user;
  }

  @Query(() => UserPaginateResponse, {
    description: "Returns an array of users",
  })
  async usersPaginate(@Args() { page, limit }: PaginateArgs) {
    const results = await this.controller.usersPaginate({ page, limit });
    return results;
  }

  @Mutation(() => User)
  @ValidateArgs(UserInputCreate, "data")
  async userCreate(@Arg("data") user: UserInputCreate) {
    const result = await this.controller.userCreate(user);
    return result;
  }

  @Mutation(() => User)
  @UseMiddleware(AuthMiddleware.IsAuth)
  @ValidateIdentifier(UserInputUpdate, "id")
  @ValidateArgs(UserInputUpdate, "data")
  async userUpdate(@Arg("id") id: string, @Arg("data") user: UserInputUpdate) {
    const result = await this.controller.userUpdate(id.toString(), user);
    return result;
  }
}

export default UserResolver;
