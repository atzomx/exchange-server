import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

import { userQuerys, userTypeDefs } from "./users";

export const resolvers = mergeResolvers([userQuerys]);

export const typeDefs = mergeTypeDefs([userTypeDefs]);
