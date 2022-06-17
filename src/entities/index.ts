import { NonEmptyArray } from "type-graphql";
import { UserResolver } from "./users";
import { DirectionResolver } from "./direction";

export const resolvers: NonEmptyArray<Function> = [
  UserResolver,
  DirectionResolver,
];

export default { resolvers };
