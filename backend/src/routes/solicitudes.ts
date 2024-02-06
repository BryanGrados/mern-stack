import express from "express";
import {
	createSolicitud,
	deleteSolicitud,
	getAllSolicitudes,
	getSolicitud,
	updateSolicitud,
} from "../controllers/solicitudes";

/**
 * Router for handling solicitudes.
 */
const solicitudesRouter = express.Router();

/**
 * Get all solicitudes.
 */
solicitudesRouter.get("/", getAllSolicitudes);

/**
 * Get a solicitud by its id.
 */
solicitudesRouter.get("/:id", getSolicitud);

/**
 * Create a solicitud.
 */
solicitudesRouter.post("/", createSolicitud);

/**
 * Update a solicitud by its id.
 */
solicitudesRouter.patch("/:id", updateSolicitud);

/**
 * Delete a solicitud by its id.
 */
solicitudesRouter.delete("/:id", deleteSolicitud);

export default solicitudesRouter;
