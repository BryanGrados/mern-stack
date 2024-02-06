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
import { CheckCircle2, ChevronsUpDown, EditIcon } from "lucide-react";
import { useUpdateUser } from "@/api/users.api";
import { useCreateUserForm } from "@/hooks/useCreateUserForm";
import { SubmitHandler } from "react-hook-form";
import { CreateNewUserType } from "@/schemas/createUser.schema";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { User } from "@/types/user.interface";
import { useUpdateUserForm } from "@/hooks/useUpdateUserForm";
import { UpdateUserType } from "@/schemas/updateUser.schema";

const roles = [
	{
		value: "USER",
		label: "Usuario",
	},
	{
		value: "ADMINISTRADOR",
		label: "Administrador",
	},
	{
		value: "GESTOR",
		label: "Gestor",
	},
	{
		value: "ATENDEDOR",
		label: "Atendedor",
	},
	{
		value: "REGISTRADOR",
		label: "Registrador",
	},
];

function EditUserForm({ user }: { user: User }) {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");
	const { register, handleSubmit } = useUpdateUserForm();
	const { mutate } = useUpdateUser();

	const onSelect = (currentValue: string) => {
		setValue(currentValue);
		setOpen(false);
	};

	const onSubmit: SubmitHandler<UpdateUserType> = (data) => {
		const newData = {
			id: user.id,
			...data,
		};

		mutate(newData);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size={"icon"}>
					<EditIcon size={18} />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Actualizar usuario</DialogTitle>
					<DialogDescription>
						Complete el formulario para actualizar un usuario
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="email" className="text-right">
								Email
							</Label>
							<Input
								id="email"
								className="col-span-3"
								{...register("email", { value: user.email })}
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Nombre
							</Label>
							<Input
								id="name"
								className="col-span-3"
								{...register("name", { value: user.name })}
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="role" className="text-right">
								Rol
							</Label>
							<Popover open={open} onOpenChange={setOpen}>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										role="combobox"
										aria-expanded={open}
										className="w-[200px] justify-between"
									>
										{roles.find((rol) => rol.value === value)?.label ||
											"Selecciona un rol"}
										<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-[200px] p-0">
									<Command>
										<CommandInput placeholder="Buscar un rol..." />
										<CommandEmpty>
											No se encontraron roles asignados
										</CommandEmpty>
										<CommandGroup>
											{roles.map((rol) => (
												<CommandItem
													key={rol.value}
													value={rol.value}
													onSelect={onSelect}
												>
													<CheckCircle2
														className={cn(
															"mr-2 h-4 w-4",
															value === rol.value ? "opacity-100" : "opacity-0",
														)}
													/>
													{rol.label}
												</CommandItem>
											))}
										</CommandGroup>
									</Command>
								</PopoverContent>
							</Popover>
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button type="submit">Actualizar usuario</Button>
						</DialogClose>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default EditUserForm;
