import "reflect-metadata";

import { User, UserModel } from "@entities/users";

import { IPagination } from "@core/domain/interfaces";
import TestUtils from "@core/infrastructure/utils/test.utils";
import UserFaker from "../../fakers/user.faker";
import authUtils from "@entities/auth/application/auth.utils";
import http from "http";
import migrations from "../../migrations";
import request from "supertest-graphql";
import server from "../../config/server";
import userQuerys from "./user.querys";

let appServer: http.Server;

let entities: {
  users: string[];
};

const keysMandatories = Object.keys(User);

describe("User Test", () => {
  beforeAll(async () => {
    entities = await migrations.up();
    const { app } = await server.start();
    appServer = app;
  });

  afterAll(async () => {
    await migrations.down();
    await server.stop();
  });

  it("Should return an user", async () => {
    const user = TestUtils.getOneFromArray(entities.users);
    const result = await request<{ userById: User }>(appServer)
      .query(userQuerys.userById)
      .variables({ user });

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("userById");
    const data = result.data.userById;
    keysMandatories.forEach((key) => {
      expect(data).toHaveProperty(key);
    });
  });

  it("Should paginate users", async () => {
    const variables = {
      page: 1,
      limit: 5,
    };

    const result = await request<{ userPaginate: IPagination<User> }>(appServer)
      .query(userQuerys.paginate)
      .variables(variables);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("userPaginate");
    const data = result.data["userPaginate"];
    expect(data).toHaveProperty("info");
    expect(data).toHaveProperty("results");
    const info = data["info"];
    expect(info).toHaveProperty("page");
    expect(info).toHaveProperty("pages");
    expect(info).toHaveProperty("total");
    const { results } = data;
    expect(results instanceof Array).toBeTruthy();
    results.forEach((user) => {
      keysMandatories.forEach((key) => {
        expect(user).toHaveProperty(key);
      });
    });
  });

  it("Should create an user", async () => {
    const newUser = UserFaker.basic();
    const result = await request<{ userCreate: User }>(appServer)
      .query(userQuerys.userCreate)
      .variables({ data: newUser });

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("userCreate");
    const data = result.data["userCreate"] as User;
    keysMandatories.forEach((key) => {
      expect(data).toHaveProperty(key);
    });
    expect(data.status).toBe("pending");
  });

  it("Shouldn't create an user by repeted email", async () => {
    const userId = TestUtils.getOneFromArray(entities.users);
    const user = await UserModel.findById(userId);
    const newUser = UserFaker.basic();

    newUser.email = user.email;

    const result = await request<{ userCreate: User }>(appServer)
      .query(userQuerys.userCreate)
      .variables({ data: newUser });

    expect(result.data).toBeNull();
    expect(result.errors instanceof Array).toBeTruthy();
    const [error] = result.errors;
    expect(error.message).toBe("User already exists");
  });

  it("Should update an user", async () => {
    const userId = TestUtils.getOneFromArray(entities.users);
    const userToken = authUtils.getToken(userId);
    const authorization = `Token ${userToken}`;
    const dataToSent = {
      firstName: "updatedfirstname",
      lastName: "updatedlastname",
      secondLastName: "updatedsecondlastname",
      curp: TestUtils.getCurp(),
    };
    const { data, errors } = await request<{ userUpdate: User }>(appServer)
      .query(userQuerys.userUpdate)
      .variables({ data: dataToSent, userId })
      .set("authorization", authorization);

    expect(errors).toBeUndefined();
    expect(data).not.toBeUndefined();
    expect(data).toHaveProperty("userUpdate");

    expect(data.userUpdate.firstName).toBe(dataToSent.firstName);
    expect(data.userUpdate.lastName).toBe(dataToSent.lastName);
    expect(data.userUpdate.secondLastName).toBe(dataToSent.secondLastName);
    expect(data.userUpdate.curp).toBe(dataToSent.curp);

    keysMandatories.forEach((key) => {
      expect(data.userUpdate).toHaveProperty(key);
    });
  });
});
