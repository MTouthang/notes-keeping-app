import express from "express";
import morgan from "morgan";

const app = express();

// middle-wares
app.use(morgan("tiny"));

// demo route
app.get("/", (req, res) => {
  res.send("Hello world");
});

export default app;
