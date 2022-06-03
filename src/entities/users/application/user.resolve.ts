import { PaginateArgs } from "@core/responses";
import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import User from "../domain/user.entity";
import UserController from "../infrastructure/user.controller";
import {
  UserInputCreate,
  UserInputUpdate,
} from "../infrastructure/user.inputs";
import { UserPaginateResponse } from "../infrastructure/user.response";

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
  async userCreate(@Arg("data") user: UserInputCreate) {
    const result = await this.controller.userCreate(user);
    return result;
  }

  @Mutation(() => User)
  async userUpdate(@Arg("id") id: string, @Arg("data") user: UserInputUpdate) {
    const result = await this.controller.userUpdate(id, user);
    return result;
  }
}

export default UserResolver;
