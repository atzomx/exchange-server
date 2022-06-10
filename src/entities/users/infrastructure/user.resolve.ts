import { ValidateArgs } from "@core/infrastructure/helpers";
import { PaginateArgs } from "@core/infrastructure/responses";
import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
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

  @Query(() => User, { description: "User by id" })
  async userById(@Arg("id") id: string): Promise<User> {
    const user = await this.controller.userById(id);
    return user;
  }

  @Query(() => UserPaginateResponse)
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
  @ValidateArgs(UserInputUpdate, "data")
  async userUpdate(@Arg("id") id: string, @Arg("data") user: UserInputUpdate) {
    const result = await this.controller.userUpdate(id, user);
    return result;
  }
}

export default UserResolver;
