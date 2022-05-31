import userQuerys from "./querys";
import userMutations from "./mutations";

export { default as userTypeDefs } from "./typedefs";
export const userResolvers = [userQuerys, userMutations];
export * from "./interfaces/User";
