import { Request, Response } from "express";
import db from "../lib/db";
import type { User } from "@prisma/client";

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await db.user.findMany();

		if (!users)
			return res.status(404).json({ message: "No se encontraron users" });

		res.json(users);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

export const getUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const user = await db.user.findUnique({
			where: { id },
			include: {
				solicitudes: true,
				HistorialAcciones: true,
			},
		});

		if (!user)
			return res.status(404).json({ message: "No se encontró la user" });

		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

export const createUser = async (req: Request, res: Response) => {
	try {
		const { id, ...formData }: User = req.body;

		const user = await db.user.create({
			data: formData,
		});

		res.status(201).json(user);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

export const updateUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const formData: User = req.body;

		const findUser = await db.user.findUnique({ where: { id } });

		if (!findUser)
			return res.status(404).json({ message: "No se encontró el usuario" });

		const user = await db.user.update({
			where: { id },
			data: formData,
		});

		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const user = await db.user.findUnique({
			where: { id },
		});

		if (!user)
			return res.status(404).json({ message: "No se encontró la user" });

		await db.user.delete({ where: { id } });

		res.status(200).json({ message: "user eliminada" });
	} catch (error) {
		res.status(500).json({ message: error });
	}
};
