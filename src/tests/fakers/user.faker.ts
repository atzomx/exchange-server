import { faker } from "@faker-js/faker";
import TestUtils from "@core/infrastructure/utils/test.utils";
import { IUserGender, IUserStatus } from "@entities/users/domain/user.enums";
import User from "@entities/users/domain/user.entity";
import UserUtils from "@entities/users/application/user.utils";

class UserFaker {
  static get() {
    const user: User = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      secondLastName: faker.name.lastName(),
      birthday: faker.date.birthdate(),
      curp: TestUtils.getCurp(),
      email: faker.internet.email(),
      gender: TestUtils.getEnumRandom(IUserGender),
      image: faker.internet.url(),
      password: faker.internet.password(),
      phoneNumber: faker.phone.number("+52##########"),
      status: TestUtils.getEnumRandom(IUserStatus),
      userName: faker.internet.userName(),
    };

    const sanitized = UserUtils.sanitize({
      curp: user.curp,
      firstName: user.firstName,
      lastName: user.lastName,
      secondLastName: user.secondLastName,
    });

    return { ...user, ...sanitized };
  }
}

export default UserFaker;
