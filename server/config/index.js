import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  MONGODB_URL: process.env.MONGODB_URL,
  cookieOption: {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    // httpOnly: true,
    domain: "https://notes-keeping-app-ui-production.up.railway.app/",
  },
};

export default config;
