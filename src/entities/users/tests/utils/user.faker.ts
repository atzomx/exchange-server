import "reflect-metadata";
import { faker } from "@faker-js/faker";
import TestUtils from "@core/infrastructure/utils/test.utils";
import { IUserGender, IUserStatus } from "../../domain/user.enums";
import User from "@entities/users/domain/user.entity";

class UserFaker {
  static get() {
    const user: User = {
      birthday: faker.date.birthdate(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      secondLastName: faker.name.lastName(),
      email: faker.internet.email(),
      userName: faker.internet.userName(),
      phoneNumber: faker.phone.number("+52##########"),
      password: faker.internet.password(),
      status: TestUtils.getEnumRandom(IUserStatus),
      gender: TestUtils.getEnumRandom(IUserGender),
      curp: TestUtils.getCurp(),
    };

    return user;
  }
}

export default UserFaker;
