import "reflect-metadata";
import TestUtils from "@core/infrastructure/utils/test.utils";
import { ApolloServer, ExpressContext } from "apollo-server-express";
import server from "../../config";
import directionQuerys from "./direction.querys";
import DirectionFaker from "../../fakers/direction.faker";
import { Types } from "mongoose";

const keysMandatories = [
  "owner",
  "name",
  "state",
  "town",
  "neighborhood",
  "street",
  "outdoorNumber",
  "zipCode",
  "extraIndications",
  "normalizedFullDirection",
];

let testServer: ApolloServer<ExpressContext>;
let entities: {
  directions: string[];
  users: string[];
};

describe("direction Test", () => {
  beforeAll(async () => {
    const initialServer = await server.start();
    entities = initialServer.entities;
    testServer = initialServer.gqlServer;
  });

  afterAll(async () => {
    await server.stop();
  });

  it("Should return a direction", async () => {
    const direction = TestUtils.getOneFromArray(entities.directions).toString();
    const result = await testServer.executeOperation({
      query: directionQuerys.directionById,
      variables: { directionByIdId: direction },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("directionById");
    const data = result.data["directionById"];
    expect(data).toHaveProperty("owner");
    expect(data).toHaveProperty("name");
    expect(data).toHaveProperty("state");
    expect(data).toHaveProperty("town");
    expect(data).toHaveProperty("neighborhood");
    expect(data).toHaveProperty("street");
    expect(data).toHaveProperty("outdoorNumber");
    expect(data).toHaveProperty("zipCode");
    expect(data).toHaveProperty("extraIndications");
    expect(data).toHaveProperty("normalizedFullDirection");
  });

  it("Should return a direction paginate ", async () => {
    const user = TestUtils.getOneFromArray(entities.users).toString();

    const result = await testServer.executeOperation({
      query: directionQuerys.paginate,
      variables: { page: 1, limit: 10, search: "algo", owner: user },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("directionPaginate");
    const data = result.data["directionPaginate"];
    expect(data).toHaveProperty("info");
    expect(data).toHaveProperty("results");
    const { info, results } = data;

    expect(info).toHaveProperty("page");
    expect(info).toHaveProperty("pages");
    expect(info).toHaveProperty("total");
    results.forEach((item) => {
      keysMandatories.forEach((key) => {
        expect(item).toHaveProperty(key);
      });
    });
  });

  it("Should return a direction create", async () => {
    const user = TestUtils.getOneFromArray(entities.users).toString();
    const direction = DirectionFaker.basic(user);
    direction.name = "nametoCreate";

    const result = await testServer.executeOperation({
      query: directionQuerys.directionCreate,
      variables: { data: direction },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("directionCreate");
    const data = result.data["directionCreate"];
    keysMandatories.forEach((key) => {
      expect(data).toHaveProperty(key);
    });
  });

  it("Should return a direction update", async () => {
    const direction = TestUtils.getOneFromArray(entities.directions).toString();
    const result = await testServer.executeOperation({
      query: directionQuerys.directionUpdate,
      variables: { data: { name: "nuevo" }, directionUpdateId: direction },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("directionUpdate");
    const data = result.data["directionUpdate"];

    expect(data.name).toEqual("nuevo");
  });

  it("Should return a direction DirectionNotFoundError", async () => {
    const result = await testServer.executeOperation({
      query: directionQuerys.directionUpdate,
      variables: {
        data: { name: "nuevo" },
        directionUpdateId: new Types.ObjectId().toString(),
      },
    });

    expect(result.data).toBeNull();

    result.errors.forEach((item) => {
      expect(item).toHaveProperty("message");
      expect(item).toHaveProperty("locations");
    });
  });

  it("Should return a direction DirectionAlreadyExistsError", async () => {
    const user = TestUtils.getOneFromArray(entities.users).toString();
    const direction = DirectionFaker.basic(user);
    direction.name = "nametoCreate";

    await testServer.executeOperation({
      query: directionQuerys.directionCreate,
      variables: { data: direction },
    });
    const result = await testServer.executeOperation({
      query: directionQuerys.directionCreate,
      variables: { data: direction },
    });
    expect(result.data).toBeNull();
    result.errors.forEach((item) => {
      expect(item).toHaveProperty("message");
      expect(item).toHaveProperty("locations");
    });
  });
});
