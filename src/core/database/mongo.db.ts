import { config } from "dotenv";
import mongoose from "mongoose";

config();

async function start() {
  try {
    const { MONGO_URL } = process.env;
    await mongoose.connect(MONGO_URL!);
    console.log("Database connected: " + MONGO_URL);
  } catch (error) {
    console.error("Error to connect database");
  }
}

export default { start };
