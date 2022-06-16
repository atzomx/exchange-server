import { Arg, Mutation, Resolver } from "type-graphql";
import AuthController from "../application/auth.controller";
import { LoginResponse } from "./auth.response";

@Resolver()
class AuthResolver {
  private controller: AuthController;

  constructor() {
    this.controller = new AuthController();
  }

  @Mutation(() => LoginResponse, { description: "Returns one user by id" })
  async userLogin(
    @Arg("userName") userName: string,
    @Arg("password") password: string,
  ): Promise<LoginResponse> {
    const token = await this.controller.getToken(userName, password);
    return { token };
  }
}

export default AuthResolver;
