import { PaginateArgs } from "@core/responses";
import { Sanitize } from "@core/utils";
import User from "../domain/user.entity";
import UserRepository from "../domain/user.repository";
import UserInput from "./user.inputs";

class UserController {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  userById(id: string) {
    return this.repository.findById(id);
  }

  async usersPaginate({ page, limit }: PaginateArgs) {
    const paginator = this.repository.paginate({}, { limit, page });
    const [results, total] = await Promise.all([
      paginator.getResults(),
      paginator.getTotal(),
    ]);

    const pages = Math.ceil(total / limit);
    return {
      results: results as User[],
      info: {
        total,
        page,
        pages,
      },
    };
  }

  async userCreate(user: UserInput): Promise<User> {
    const { firstName, lastName, secondLastName = "" } = user;
    const fullName = [firstName, lastName, secondLastName]
      .map((name) => name.trim().trimEnd())
      .join(" ");
    const normalizedFullName = Sanitize.accents(fullName).toLowerCase();

    const result = await this.repository.create({
      ...user,
      normalizedFullName,
    });
    return result;
  }
}

export default UserController;
