import Entities from "@entities";
import { ApolloServer } from "apollo-server-express";
import * as path from "path";
import { buildSchema } from "type-graphql";

async function start() {
  const schema = await buildSchema({
    resolvers: Entities.resolvers,
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    validate: true,
  });

  const server = new ApolloServer({
    debug: false,
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  return server;
}

export default { start };
