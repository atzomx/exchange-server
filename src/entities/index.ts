/* eslint-disable @typescript-eslint/ban-types */
import { NonEmptyArray } from "type-graphql";
import { UserResolver } from "./users";
import { DirectionResolver } from "./direction";
import { MeetingResolver } from "./meeting";

import { AuthResolver } from "./auth";

export const resolvers: NonEmptyArray<Function> = [
  UserResolver,
  AuthResolver,
  DirectionResolver,
  MeetingResolver,
];

export default { resolvers };
