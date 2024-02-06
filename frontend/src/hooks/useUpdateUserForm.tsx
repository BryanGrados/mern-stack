import { UpdateUser, UpdateUserType } from "@/schemas/updateUser.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useUpdateUserForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UpdateUserType>({ resolver: zodResolver(UpdateUser) });

	return {
		register,
		handleSubmit,
		errors,
	};
};
