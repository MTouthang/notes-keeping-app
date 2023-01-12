import CookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

// middle-wares
app.use(morgan("tiny")); // logging visited routes
app.use(express.json()); // handling json object
app.use(cors()); // handling communication between different domain
app.use(CookieParser()); // handling cookie

// routes
import api from "./routes/user.route.js";
app.use("/api/v1", api);

export default app;
