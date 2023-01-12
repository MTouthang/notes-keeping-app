import CookieParser from "cookieparser";
import express from "express";
import morgan from "morgan";

const app = express();

// middle-wares
app.use(morgan("tiny")); // logging visited routes
app.use(express.json()); // handling json object
app.use(cors()); // handling communication between different domain
app.use(CookieParser()); // handling cookie

// demo route
app.get("/", (req, res) => {
  res.send("Hello world");
});

export default app;
