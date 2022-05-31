import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

import { userResolvers, userTypeDefs } from "./users";

export const resolvers = mergeResolvers([...userResolvers]);

export const typeDefs = mergeTypeDefs([userTypeDefs]);
