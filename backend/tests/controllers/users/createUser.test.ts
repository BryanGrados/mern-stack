import type { Request, Response } from "express";
import db from "../../../src/lib/db";
import { createUser } from "../../../src/controllers/users";

jest.mock("../../../src/lib/db", () => ({
	user: {
		create: jest.fn(),
	},
}));

describe("createUser", () => {
	let req: Request;
	let res: Response;

	beforeEach(() => {
		req = {
			body: {
				name: "John Doe",
				email: "john@example.com",
			},
		} as Request;

		res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		} as unknown as Response;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should create a new user and return it", async () => {
		const createdUser = {
			name: "John Doe",
			email: "john@example.com",
		};

		(db.user.create as jest.Mock).mockResolvedValue(createdUser);

		await createUser(req, res);

		expect(db.user.create).toHaveBeenCalledWith({ data: req.body });
		expect(res.status).toHaveBeenCalledWith(201);
		expect(res.json).toHaveBeenCalledWith(createdUser);
	});

	it("should handle errors and return 500 status code", async () => {
		const error = "Internal server error";

		(db.user.create as jest.Mock).mockRejectedValue(error);

		await createUser(req, res);

		expect(db.user.create).toHaveBeenCalledWith({ data: req.body });
		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({ message: error });
	});
});
