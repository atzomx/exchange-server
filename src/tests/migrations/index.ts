import mongodb from "../config/db";
import DirectionMigrate from "./direction.migrate";
import UserMigrate from "./user.migrate";

const up = async () => {
  await mongodb.start();
  const users = await UserMigrate.up();
  const directions = await DirectionMigrate.up(users);
  return { users, directions };
};

const down = async () => {
  await UserMigrate.down();
  await DirectionMigrate.down();
  await mongodb.finish();
};

export default { up, down };
