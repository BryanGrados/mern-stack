import express from "express";
import solicitudesRouter from "./routes/solicitudes";
import morgan from "morgan";
import usersRouter from "./routes/users";
import historialAccionesRouter from "./routes/historialAcciones";
import cors from "cors";

/**
 * Express application instance with morgan as logger.
 */
const app = express();

/**
 * Use cors to allow cross-origin requests.
 */
app.use(cors());

/**
 * Middleware to parse the request body.
 */
app.use(express.json());

/**
 * Middleware to set the CORS headers.
 */
app.use((req, res, next) => {
	next();
});

/**
 * App routes.
 */
app.use("/api/solicitudes", solicitudesRouter);
app.use("/api/users", usersRouter);
app.use("/api/historialAcciones", historialAccionesRouter);

app.use(morgan("dev"));

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
