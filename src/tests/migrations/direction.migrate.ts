import { DirectionRepository } from "@entities/direction";
import DirectionFaker from "../fakers/direction.faker";
import TestUtils from "@core/infrastructure/utils/test.utils";
import { Types } from "mongoose";

const TOTAL_DIRECTION = 20;

const up = async (users: string[]) => {
  const directionRepository = new DirectionRepository();
  const newDirections = Array(TOTAL_DIRECTION)
    .fill(null)
    .map(() =>
      DirectionFaker.get(new Types.ObjectId(TestUtils.getOneFromArray(users))),
    );
  const filterDirections = new Set();
  newDirections.forEach((direction) => {
    filterDirections.add(direction);
  });
  const directionsCreated = await directionRepository.insertMany(newDirections);

  const ids = directionsCreated.map(({ _id }) => _id.toString());
  return ids;
};

const down = async () => {
  const directionRepository = new DirectionRepository();
  await directionRepository.deleteMany();
};

export default { up, down };
