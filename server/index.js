import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/index.js";

//TODO: self invoke function
// DB connection, listen and error logging

/**
 * self invoke async function
 * to connect to the db
 * to start the server
 * catch error if fail
 * syntax - (async () => {})()
 */

(async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(config.MONGODB_URL);

    console.log("DB connected successfully :D");

    app.on("error", (err) => {
      console.log("ERROR: ", err);
      throw err;
    });

    const onListening = () => {
      console.log(`Listening on ${config.PORT}`);
    };

    app.listen(config.PORT, onListening);
  } catch (err) {
    console.log("ERROR", err);
    throw err;
  }
})();
