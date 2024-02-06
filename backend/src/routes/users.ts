import express from "express";
import {
	getAllUsers,
	createUser,
	deleteUser,
	getUser,
	updateUser,
} from "../controllers/users";

const usersRouter = express.Router();
/**
 * Get all users.
 */
usersRouter.get("/", getAllUsers);

/**
 * Get a user by its id.
 */
usersRouter.get("/:id", getUser);

/**
 * Create a user.
 */
usersRouter.post("/", createUser);

/**
 * Update a user by its id.
 */
usersRouter.patch("/:id", updateUser);

/**
 * Delete a user by its id.
 */
usersRouter.delete("/:id", deleteUser);

export default usersRouter;
