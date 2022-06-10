import { NonEmptyArray } from "type-graphql";
import { UserResolver } from "./users";

export const resolvers: NonEmptyArray<Function> = [UserResolver];

export default { resolvers };
