/* eslint-disable @typescript-eslint/ban-types */
import { NonEmptyArray } from "type-graphql";
import { UserResolver } from "./users";
import { DirectionResolver } from "./direction";
import { DocumentResolver } from "./document";
import { AuthResolver } from "./auth";
import { ExchangeResolver } from "./exhange";
import { MeetingResolver } from "./meeting";
import { ShippingResolver } from "./shipping";

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
