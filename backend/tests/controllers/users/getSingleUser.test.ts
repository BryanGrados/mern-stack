import { Request, Response } from "express";
import db from "../../../src/lib/db";
import { getUser } from "../../../src/controllers/users";

jest.mock("../../../src/lib/db", () => ({
	user: {
		findUnique: jest.fn(),
	},
}));

describe("getUser", () => {
	let req: Request;
	let res: Response;

	beforeEach(() => {
		req = {
			params: { id: "1" },
		} as unknown as Request;
		res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		} as unknown as Response;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should return the user if found", async () => {
		const user = { id: "1", name: "John Doe" };
		(db.user.findUnique as jest.Mock).mockResolvedValue(user);

		await getUser(req, res);

		expect(db.user.findUnique).toHaveBeenCalledWith({
			where: { id: "1" },
			include: {
				solicitudes: true,
				HistorialAcciones: true,
			},
		});
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith(user);
	});

	it("should return 404 if user is not found", async () => {
		(db.user.findUnique as jest.Mock).mockResolvedValue(null);

		await getUser(req, res);

		expect(db.user.findUnique).toHaveBeenCalledWith({
			where: { id: "1" },
			include: {
				solicitudes: true,
				HistorialAcciones: true,
			},
		});
		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			message: "No se encontró la user",
		});
	});

	it("should return 500 if an error occurs", async () => {
		const error = "Internal server error";
		(db.user.findUnique as jest.Mock).mockRejectedValue(error);

		await getUser(req, res);

		expect(db.user.findUnique).toHaveBeenCalledWith({
			where: { id: "1" },
			include: {
				solicitudes: true,
				HistorialAcciones: true,
			},
		});
		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({ message: error });
	});
});
