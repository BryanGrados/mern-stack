import { useGetAllUsers } from "@/api/users.api";
import { Skeleton } from "@/components/ui/skeleton";
import CreateUserForm from "@/components/users/CreateUserForm";
import UserList from "@/components/users/UserList";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/users")({
	component: Users,
});

function Users() {
	const { data: users, isLoading, error } = useGetAllUsers();

	return (
		<div className="flex flex-col gap-5">
			<div className="bg-white flex items-center rounded-lg px-4 py-2 justify-between">
				<h1>Registro de Usuarios</h1>
				<CreateUserForm />
			</div>
			{users && <UserList users={users} />}
			{isLoading && <Skeleton className="w-full h-96 rounded-lg" />}
			{error && <div>Error al cargar los usuarios</div>}
		</div>
	);
}
