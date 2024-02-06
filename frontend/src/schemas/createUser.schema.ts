import { z } from "zod";

export const CreateNewUser = z.object({
	email: z.string().email(),
	name: z.string().min(3).max(20),
	password: z.string().min(3).max(20),
	role: z.string().min(3).max(20).optional().default("USER"),
});

export type CreateNewUserType = z.infer<typeof CreateNewUser>;
