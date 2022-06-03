import { PaginateArgs } from "@core/responses";
import { Context } from "apollo-server-core";
import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import User from "../domain/user.entity";
import UserController from "../infrastructure/user.controller";
import UserInput from "../infrastructure/user.inputs";
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
  async userCreate(@Arg("data") user: UserInput, @Ctx() ctx: Context) {
    const result = await this.controller.userCreate(user);
    return result;
  }
}

export default UserResolver;
