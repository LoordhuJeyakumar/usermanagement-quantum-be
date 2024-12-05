import app from "./app.js";
import connectDB from "./config/dbConfig.js";
import envConfig from "./config/envConfig.js";

const startServer = async () => {
  try {
    // Connect to the database
    await connectDB();
    console.log("✅ Database connected. Starting the server...");

    // Start the server
    const PORT = envConfig.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start the server:", error.message);
    process.exit(1); // Exit the application if the server cannot start
  }
};

// Start the application
startServer();
