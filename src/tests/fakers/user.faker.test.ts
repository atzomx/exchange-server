import "reflect-metadata";
import UserFaker from "./user.faker";

const keysMandatories = [
  "birthday",
  "firstName",
  "lastName",
  "secondLastName",
  "email",
  "userName",
  "phoneNumber",
  "password",
  "status",
  "gender",
  "curp",
];

describe("User faker", () => {
  it("Should return a user random", () => {
    const user = UserFaker.get();
    keysMandatories.forEach((key) => {
      expect(user).toHaveProperty(key);
    });
    expect(user.birthday).toBeInstanceOf(Date);
  });
});
