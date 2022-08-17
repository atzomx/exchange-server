import "reflect-metadata";
import { Log } from "@core/infrastructure/utils";
import Entities from "@entities";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer, ExpressContext } from "apollo-server-express";
import express from "express";
import http from "http";
import * as path from "path";
import { buildSchema } from "type-graphql";

export async function create(
  port: number,
): Promise<ApolloServer<ExpressContext>> {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: Entities.resolvers,
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    validate: true,
  });

  const server = new ApolloServer({
    debug: false,
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req, res }) => ({ req, res }),
  });
  await server.start();

  server.applyMiddleware({ app });

  return new Promise((resolve, reject) => {
    httpServer
      .listen(port)
      .once("listening", () => resolve(server))
      .once("error", reject);
  });
}

async function start() {
  try {
    const PORT = Number(process.env.PORT ?? 4000);
    await create(PORT);
    Log.i("Server is ready at http://localhost:4000/graphql");
  } catch (err) {
    Log.e("Error starting the node server", err);
  }
}

export default { start };
