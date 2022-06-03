import { registerEnumType } from "type-graphql";

export enum IUserGender {
  "male" = "male",
  "female" = "female",
  "other" = "other",
}

registerEnumType(IUserGender, {
  name: "Gender",
  description: "People gender",
});
