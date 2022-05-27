import { ApolloServerPluginDrainHttpServer, gql } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";

import { resolvers } from "../entities";

const typeDefs = gql`
  type User {
    id: Int
    city: String
    name: String
  }

  type Query {
    user(id: Int): User
    users: [User]
  }
`;
async function listen(port: number) {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  server.applyMiddleware({ app });

  return new Promise((resolve, reject) => {
    httpServer.listen(port).once("listening", resolve).once("error", reject);
  });
}

async function main() {
  try {
    await listen(4000);
    console.log("Server is ready at http://localhost:4000/graphql");
  } catch (err) {
    console.error("Error starting the node server", err);
  }
}

export const start = () => main();
