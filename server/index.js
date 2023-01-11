import app from "./app.js";
import config from "./config/index.js";

//TODO: self invoke function
// DB connection, listen and error logging
app.listen(config.PORT, () => {
  console.log(`Sever up and running at port ${config.PORT}`);
});
