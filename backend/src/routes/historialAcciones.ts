import express from "express";
import {
	getAllHistorialAcciones,
	createHistorialAccion,
	deleteHistorialAccion,
	getHistorialAccion,
	updateHistorialAccion,
} from "../controllers/historialAcciones";

const historialAccionesRouter = express.Router();

historialAccionesRouter.get("/", getAllHistorialAcciones);

historialAccionesRouter.get("/:id", getHistorialAccion);

historialAccionesRouter.post("/", createHistorialAccion);

historialAccionesRouter.patch("/:id", updateHistorialAccion);

historialAccionesRouter.delete("/:id", deleteHistorialAccion);

export default historialAccionesRouter;
