import env from "dotenv-safe";

env.config();

const envConfig = {
  PORT: process.env.PORT,
  MONGODB_CONNECTION_URI: process.env.MONGODB_CONNECTION_URI,
  DB_NAME: process.env.DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default envConfig;
