import { config } from "./config.js";
import mongoose from "mongoose";

export const connectToDB = async (): Promise<void> => {
    await mongoose.connect(config.MONGO_URI)
    console.log("Connected to DB")
}