/* eslint-disable @typescript-eslint/ban-types */

import { AuthResolver } from "./auth";
import { DirectionResolver } from "./direction";
import { DocumentResolver } from "./document";
import { ExchangeResolver } from "./exhange";
import { MeetingResolver } from "./meeting";
import { NonEmptyArray } from "type-graphql";
import { ShippingResolver } from "./shipping";
import { UserResolver } from "./users";

export const resolvers: NonEmptyArray<Function> = [
  UserResolver,
  AuthResolver,
  DirectionResolver,
  ExchangeResolver,
  MeetingResolver,
  ShippingResolver,
  DocumentResolver,
];

export default { resolvers };
