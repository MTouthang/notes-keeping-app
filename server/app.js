import CookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
const swaggerDocument = YAML.load("./swagger.yaml");

const app = express();

// middle-wares
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // swagger setup
app.use(morgan("tiny")); // logging visited routes
app.use(express.json()); // handling json object
app.use(cors()); // handling communication between different domain
app.use(CookieParser()); // handling cookie

// routes
import userApi from "./routes/user.route.js";
import noteApi from "./routes/note.route.js";
app.use("/api/v1", userApi);
app.use("/api/v1", noteApi);

export default app;
