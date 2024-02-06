import { CreateNewUser, CreateNewUserType } from "@/schemas/createUser.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useCreateUserForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateNewUserType>({ resolver: zodResolver(CreateNewUser) });

	return {
		register,
		handleSubmit,
		errors,
	};
};
