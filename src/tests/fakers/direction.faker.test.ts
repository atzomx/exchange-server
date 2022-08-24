import "reflect-metadata";
import DirectionFaker from "./direction.faker";
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

describe("Description faker", () => {
  it("Should return a description random", () => {
    const id = new Types.ObjectId();
    const description = DirectionFaker.get(id);
    keysMandatories.forEach((key) => {
      expect(description).toHaveProperty(key);
    });
    expect(description.owner).toBe(id);
  });
});
