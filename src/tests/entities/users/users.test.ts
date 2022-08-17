import "reflect-metadata";
import TestUtils from "@core/infrastructure/utils/test.utils";
import { ApolloServer, ExpressContext } from "apollo-server-express";
import migrations from "../../migrations";
import server from "../../config/server";
import userQuerys from "./user.querys";

let testServer: ApolloServer<ExpressContext>;
let entities: {
  users: string[];
};

describe("User Test", () => {
  beforeAll(async () => {
    testServer = await server.start();
    entities = await migrations.up();
  });

  it("Should return a user", async () => {
    const user = TestUtils.getOneFromArray(entities.users).toString();
    const result = await testServer.executeOperation({
      query: userQuerys.user,
      variables: { user },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("userById");
    const data = result.data["userById"];
    expect(data).toHaveProperty("birthday");
    expect(data).toHaveProperty("firstName");
    expect(data).toHaveProperty("lastName");
    expect(data).toHaveProperty("secondLastName");
    expect(data).toHaveProperty("email");
    expect(data).toHaveProperty("userName");
    expect(data).toHaveProperty("phoneNumber");
    expect(data).toHaveProperty("status");
    expect(data).toHaveProperty("gender");
    expect(data).toHaveProperty("curp");
    expect(data.birthday).toBeInstanceOf(Date);
  });
});
