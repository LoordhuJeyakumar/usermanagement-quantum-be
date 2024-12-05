import mongoose from "mongoose";
import envConfig from "./envConfig.js";

const connectDB = async (maxRetries = 5, retryDelay = 5000) => {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      await mongoose.connect(envConfig.MONGODB_CONNECTION_URI, {
        dbName: envConfig.DB_NAME,
      });
      console.log("✅ MongoDB connected successfully");
      return; // Exit the loop once connected
    } catch (error) {
      retries++;
      console.error(
        `❌ MongoDB connection failed (Attempt ${retries} of ${maxRetries}): ${error.message}`
      );

      if (retries < maxRetries) {
        console.log(
          `⏳ Retrying connection in ${retryDelay / 1000} seconds...`
        );

        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      } else {
        console.error("❌ Max retries reached. Exiting application...");
        process.exit(1); // Exit if all retries fail
      }
    }
  }
};

export default connectDB;
