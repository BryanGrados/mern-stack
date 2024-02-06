import { Request, Response } from "express";
import db from "../lib/db";
import type { HistorialAcciones } from "@prisma/client";

export const getAllHistorialAcciones = async (req: Request, res: Response) => {
	try {
		const historialAcciones = await db.historialAcciones.findMany();

		if (!historialAcciones)
			return res
				.status(404)
				.json({ message: "No se encontraron historial de acciones" });

		res.json(historialAcciones);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

export const getHistorialAccion = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const historialAccion = await db.historialAcciones.findUnique({
			where: { id },
		});

		if (!historialAccion)
			return res
				.status(404)
				.json({ message: "No se encontró historiales para la solicitud" });

		res.status(200).json(historialAccion);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

export const createHistorialAccion = async (req: Request, res: Response) => {
	try {
		const { id, ...formData }: HistorialAcciones = req.body;

		const createHistorialAccion = await db.historialAcciones.create({
			data: formData,
		});

		res.status(201).json(createHistorialAccion);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

export const updateHistorialAccion = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const formData: HistorialAcciones = req.body;

		const findHistorialAccion = await db.historialAcciones.findUnique({
			where: { id },
		});

		if (!findHistorialAccion)
			return res
				.status(404)
				.json({ message: "No se encontró algun historial con esa ID" });

		const historialAccion = await db.historialAcciones.update({
			where: { id },
			data: formData,
		});

		res.status(200).json(historialAccion);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

export const deleteHistorialAccion = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const historialAccion = await db.historialAcciones.findUnique({
			where: { id },
		});

		if (!historialAccion)
			return res
				.status(404)
				.json({ message: "No se encontró historiales para la solicitud" });

		await db.historialAcciones.delete({ where: { id } });

		res.status(200).json({ message: "Historial de acción eliminada" });
	} catch (error) {
		res.status(500).json({ message: error });
	}
};
