import { PaginateArgs } from "@core/infrastructure/responses";
import User from "../domain/user.entity";
import UserRepository from "../domain/user.repository";

import {
  UserInputCreate,
  UserInputUpdate,
} from "../infrastructure/user.inputs";

import userUtils from "./user.utils";

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
      results: results,
      info: {
        total,
        page,
        pages,
      },
    };
  }

  async userCreate(user: UserInputCreate): Promise<User> {
    const sanitized = userUtils.sanitize({
      firstName: user.firstName,
      lastName: user.lastName,
      secondLastName: user.secondLastName,
      curp: user.curp,
    });

    const newUser = { ...user, ...sanitized };
    const result = await this.repository.create({ ...newUser });
    return result;
  }

  async userUpdate(id: string, user: UserInputUpdate): Promise<User> {
    const currentUser = await this.repository.findById(id);
    const sanitized = userUtils.sanitize({
      firstName: user.firstName ?? currentUser.firstName,
      lastName: user.lastName ?? currentUser.lastName,
      secondLastName: user.secondLastName ?? currentUser.secondLastName,
      curp: user.curp ?? currentUser.curp,
    });
    const dataToUpdate = { ...user, ...sanitized };
    const updatedUser = await this.repository.findByIdAndUpdate(
      id,
      dataToUpdate,
    );
    return updatedUser;
  }
}

export default UserController;
