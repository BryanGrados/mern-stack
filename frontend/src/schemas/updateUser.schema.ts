import { z } from "zod";

export const UpdateUser = z.object({
	email: z.string().email(),
	name: z.string().min(3).max(20),
	role: z.string().min(3).max(20).optional().default("USER"),
});

export type UpdateUserType = z.infer<typeof UpdateUser>;
