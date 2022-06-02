import { PaginateArgs, PaginateResponse } from "@core/responses";
import { Arg, Args, Query, Resolver } from "type-graphql";
import { UserPaginateResponse } from "./user.args";
import UserController from "./user.controller";
import User from "./user.entity";

@Resolver(User)
class UserResolver {
  private controller: UserController;

  constructor() {
    this.controller = new UserController();
  }

  @Query(() => User)
  async user(@Arg("id") id: string) {
    const user = await this.controller.user(id);
    return user;
  }

  @Query(() => UserPaginateResponse)
  async users(@Args() { page, limit }: PaginateArgs) {
    const results = await this.controller.users({ page, limit });
    return results;
  }
}

export default UserResolver;
