import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

async function start() {
  const mongod = await MongoMemoryServer.create();
  const MONGO_URL = mongod.getUri();
  await mongoose.connect(MONGO_URL);
}

export default { start };
