import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { UserPlus2 } from "lucide-react";
import { useCreateUser } from "@/api/users.api";
import { useCreateUserForm } from "@/hooks/useCreateUserForm";
import { SubmitHandler } from "react-hook-form";
import { CreateNewUserType } from "@/schemas/createUser.schema";

function CreateUserForm() {
	const { data: newUser, isSuccess, isPending, mutate } = useCreateUser();
	const { register, errors, handleSubmit } = useCreateUserForm();

	const onSubmit: SubmitHandler<CreateNewUserType> = (data) => {
		mutate(data);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size={"icon"}>
					<UserPlus2 size={18} />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Crear nuevo usuario</DialogTitle>
					<DialogDescription>
						Complete el formulario para crear un nuevo usuario
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="email" className="text-right">
								Email
							</Label>
							<Input id="email" className="col-span-3" {...register("email")} />
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Nombre
							</Label>
							<Input id="name" className="col-span-3" {...register("name")} />
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="password" className="text-right">
								Contraseña
							</Label>
							<Input
								id="password"
								type="password"
								className="col-span-3"
								{...register("password")}
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="role" className="text-right">
								Rol
							</Label>
							<Input
								id="role"
								disabled
								className="col-span-3"
								defaultValue={"USER"}
							/>
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button type="submit">Crear usuario</Button>
						</DialogClose>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default CreateUserForm;
