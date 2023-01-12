import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT,
  JWT_SECRET_KEY: process.env.JWTSECRETKEY,
  JWT_EXPIRY: process.env.JWTEXPIRY,
  MONGODB_URL: process.env.MONGODB_URL,
};

export default config;
