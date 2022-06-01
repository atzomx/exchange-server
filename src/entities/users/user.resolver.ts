import { Arg, Query, Resolver } from "type-graphql";
import User from "./user.entity";
import UserModel from "./user.model";

@Resolver(User)
class UserResolver {
  @Query(() => User)
  async user(@Arg("id") id: string) {
    const user = await UserModel.findById(id);
    return user;
  }

  @Query(() => [User])
  async users() {
    const users = await UserModel.find({});
    return users;
  }
}

export default UserResolver;
