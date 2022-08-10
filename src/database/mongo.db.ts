import { config } from "dotenv";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Log } from "@core/infrastructure/utils";

config();

async function start() {
  try {
    let { MONGO_URL } = process.env;

    if (process.env.ENV === "test") {
      const mongod = await MongoMemoryServer.create();
      MONGO_URL = mongod.getUri();
    }

    await mongoose.connect(MONGO_URL!);
    Log.i("Database connected: " + MONGO_URL);
  } catch (error) {
    Log.e("Error to connect database");
  }
}

export default { start };
