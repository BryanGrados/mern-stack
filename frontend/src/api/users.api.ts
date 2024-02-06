import { queryClient } from "@/components/QueryProvider";
import { User } from "@/types/user.interface";
import { useMutation, useQuery } from "@tanstack/react-query";

export const getAllUsers = async () => {
	const res = await fetch("http://localhost:3000/api/users");
	if (!res.ok) {
		throw new Error("Network response was not ok");
	}
	const data = await res.json();
	const user: User[] = data;

	return user;
};

export const useGetAllUsers = () => {
	return useQuery({
		queryKey: ["getUsers"],
		queryFn: getAllUsers,
	});
};

export const getUserById = async (id: string) => {
	const res = await fetch(`http://localhost:3000/api/users/${id}`);
	if (!res.ok) {
		throw new Error("Network response was not ok");
	}
	const data = await res.json();
	const user: User = data;

	return user;
};

export const useGetUserById = (id: string) => {
	return useQuery({
		queryKey: ["getUserById", id],
		queryFn: () => getUserById(id),
	});
};

export const createUser = async (user: User) => {
	const res = await fetch("http://localhost:3000/api/users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	});
	if (!res.ok) {
		throw new Error("Network response was not ok");
	}
	const data = await res.json();
	const newUser: User = data;

	return newUser;
};

export const useCreateUser = () => {
	return useMutation({
		mutationFn: createUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getUsers"] });
		},
	});
};

export const updateUser = async (user: User) => {
	const { id, ...editableData } = user;

	const res = await fetch(`http://localhost:3000/api/users/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(editableData),
	});

	if (!res.ok) {
		throw new Error("Network response was not ok");
	}
	const data = await res.json();
	const updatedUser: User = data;

	return updatedUser;
};

export const useUpdateUser = () => {
	return useMutation({
		mutationFn: updateUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getUsers"] });
		},
	});
};

export const deleteUser = async (id: string) => {
	const res = await fetch(`http://localhost:3000/api/users/${id}`, {
		method: "DELETE",
	});

	if (!res.ok) {
		throw new Error("Network response was not ok");
	}
	const data = await res.json();
	const deletedUser: User = data;

	return deletedUser;
};

export const useDeleteUser = () => {
	return useMutation({
		mutationFn: deleteUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getUsers"] });
		},
	});
};
