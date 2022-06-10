import { Log } from "@core/infrastructure/utils";
import { config } from "dotenv";
import mongoose from "mongoose";

config();

async function start() {
  try {
    const { MONGO_URL } = process.env;
    await mongoose.connect(MONGO_URL!);
    Log.i("Database connected: " + MONGO_URL);
  } catch (error) {
    Log.e("Error to connect database");
  }
}

export default { start };
