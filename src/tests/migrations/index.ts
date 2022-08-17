import mongodb from "../config/db";
import UserMigrate from "./user.migrate";

const up = async () => {
  await mongodb.start();
  const users = await UserMigrate.up();
  return { users };
};

const down = async () => {
  await UserMigrate.down();
};

export default { up, down };