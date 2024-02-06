import { User } from "@/types/user.interface";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Edit, Trash } from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useDeleteUser, useUpdateUser } from "@/api/users.api";
import EditUserForm from "./EditUserForm";

function UserList({ users }: { users: User[] }) {
	const { mutate: deleteMutate } = useDeleteUser();
	const { mutate: updateMutate } = useUpdateUser();

	const handleDelete = (id: string) => {
		deleteMutate(id);
	};

	const handleEdit = (user: User) => {
		updateMutate(user);
	};

	return (
		<Table className="bg-white rounded-lg">
			<TableHeader>
				<TableRow>
					<TableHead>ID</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Nombre</TableHead>
					<TableHead>Role</TableHead>
					<TableHead>Acciones</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{users.map((user) => (
					<TableRow key={user.email} className="text-muted-foreground">
						<TableCell>{user.id}</TableCell>
						<TableCell>{user.email}</TableCell>
						<TableCell>{user.name}</TableCell>
						<TableCell>{user.role}</TableCell>
						<TableCell className="flex gap-5">
							<EditUserForm user={user} />

							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button type="submit" size={"icon"} variant={"destructive"}>
										<Trash size={18} />
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>
											¿Estás seguro de que quieres eliminar este usuario?
										</AlertDialogTitle>
										<AlertDialogDescription>
											No podrás deshacer esta acción. Todos los datos serán
											eliminados permanentemente y no podrás recuperarlos.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancelar</AlertDialogCancel>
										<AlertDialogAction
											className="hover:bg-destructive"
											onClick={() => handleDelete(user.id as string)}
										>
											Confirmar
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

export default UserList;
