import "reflect-metadata";
import TestUtils from "@core/infrastructure/utils/test.utils";
import { User, UserModel } from "@entities/users";
import { ApolloServer, ExpressContext } from "apollo-server-express";
import migrations from "../../migrations";
import server from "../../config/server";
import userQuerys from "./user.querys";
import UserFaker from "../../fakers/user.faker";

let testServer: ApolloServer<ExpressContext>;
let entities: {
  users: string[];
};

const keysMandatories = Object.keys(User);

describe("User Test", () => {
  beforeAll(async () => {
    entities = await migrations.up();
    testServer = await server.start();
  });

  afterAll(async () => {
    await migrations.down();
    await testServer.stop();
  });

  it("Should return a user", async () => {
    const user = TestUtils.getOneFromArray(entities.users);
    const result = await testServer.executeOperation({
      query: userQuerys.userById,
      variables: { user },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("userById");
    const data = result.data["userById"] as User;
    keysMandatories.forEach((key) => {
      expect(data).toHaveProperty(key);
    });
  });

  it("Should paginate users", async () => {
    const variables = {
      page: 1,
      limit: 5,
    };
    const result = await testServer.executeOperation({
      query: userQuerys.paginate,
      variables,
    });
    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("userPaginate");
    const data = result.data["userPaginate"];
    expect(data).toHaveProperty("info");
    expect(data).toHaveProperty("results");
    const info = data["info"];
    expect(info).toHaveProperty("page");
    expect(info).toHaveProperty("pages");
    expect(info).toHaveProperty("total");
    const results = data["results"] as User[];
    expect(results instanceof Array).toBeTruthy();
    results.forEach((user) => {
      keysMandatories.forEach((key) => {
        expect(user).toHaveProperty(key);
      });
    });
  });

  it("Should create a user", async () => {
    const newUser = UserFaker.basic();
    const result = await testServer.executeOperation({
      query: userQuerys.userCreate,
      variables: { data: newUser },
    });
    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("userCreate");
    const data = result.data["userCreate"] as User;
    keysMandatories.forEach((key) => {
      expect(data).toHaveProperty(key);
    });
    expect(data.status).toBe("pending");
  });

  it("Shouldn't create a user", async () => {
    const userId = TestUtils.getOneFromArray(entities.users);
    const user = await UserModel.findById(userId);
    const newUser = UserFaker.basic();

    newUser.email = user.email;

    const result = await testServer.executeOperation({
      query: userQuerys.userCreate,
      variables: { data: newUser },
    });
    expect(result.data).toBeNull();
    expect(result.errors instanceof Array).toBeTruthy();
    const [error] = result.errors;
    expect(error.message).toBe("User already exists");
  });
});
