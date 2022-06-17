/* eslint-disable @typescript-eslint/ban-types */
import { NonEmptyArray } from "type-graphql";
import { UserResolver } from "./users";
import { AuthResolver } from "./auth";

export const resolvers: NonEmptyArray<Function> = [UserResolver, AuthResolver];

export default { resolvers };
