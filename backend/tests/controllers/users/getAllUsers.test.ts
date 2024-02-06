import { Request, Response } from "express";
import { getAllUsers } from "../../../src/controllers/users";
import db from "../../../src/lib/db";

jest.mock("../../../src/lib/db", () => ({
	user: {
		findMany: jest.fn(),
	},
}));

describe("getAllUsers", () => {
	let req: Request;
	let res: Response;

	beforeEach(() => {
		req = {} as Request;
		res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		} as unknown as Response;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should return all users", async () => {
		const users = [
			{ id: 1, name: "John" },
			{ id: 2, name: "Jane" },
		];
		(db.user.findMany as jest.Mock).mockResolvedValue(users);

		await getAllUsers(req, res);

		expect(db.user.findMany).toHaveBeenCalledTimes(1);
		expect(res.json).toHaveBeenCalledWith(users);
	});

	it("should return 404 if no users found", async () => {
		(db.user.findMany as jest.Mock).mockResolvedValue(null);

		await getAllUsers(req, res);

		expect(db.user.findMany).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			message: "No se encontraron users",
		});
	});

	it("should return 500 if an error occurs", async () => {
		const errorMessage = "Internal server error";
		(db.user.findMany as jest.Mock).mockRejectedValue(errorMessage);

		await getAllUsers(req, res);

		expect(db.user.findMany).toHaveBeenCalledTimes(1);
		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
	});
});
