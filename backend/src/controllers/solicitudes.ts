import { Request, Response } from "express";
import db from "../lib/db";
import type { Solicitud } from "@prisma/client";

export const getAllSolicitudes = async (req: Request, res: Response) => {
	try {
		const solicitudes = await db.solicitud.findMany();

		if (!solicitudes)
			return res.status(404).json({ message: "No se encontraron solicitudes" });

		res.json(solicitudes);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

export const getSolicitud = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const solicitud = await db.solicitud.findUnique({
			where: { id },
		});

		if (!solicitud)
			return res.status(404).json({ message: "No se encontró la solicitud" });

		res.status(200).json(solicitud);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

export const createSolicitud = async (req: Request, res: Response) => {
	try {
		const { id, ...formData }: Solicitud = req.body;

		const solicitud = await db.solicitud.create({
			data: formData,
		});

		res.status(201).json(solicitud);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

export const updateSolicitud = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const formData = req.body;

		const findSolicitud = await db.solicitud.findUnique({ where: { id } });

		if (!findSolicitud)
			return res.status(404).json({ message: "No se encontró la solicitud" });

		const solicitud = await db.solicitud.update({
			where: { id },
			data: formData,
		});

		res.status(200).json(solicitud);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

export const deleteSolicitud = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const solicitud = await db.solicitud.findUnique({
			where: { id },
		});

		if (!solicitud)
			return res.status(404).json({ message: "No se encontró la solicitud" });

		await db.solicitud.delete({ where: { id } });

		res.status(200).json({ message: "Solicitud eliminada" });
	} catch (error) {
		res.status(500).json({ message: error });
	}
};
