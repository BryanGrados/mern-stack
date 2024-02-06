import { Link } from "@tanstack/react-router";
import { FilePlus2, HomeIcon, User } from "lucide-react";

const navPaths = [
	{
		path: "/",
		name: "Inicio",
		icon: HomeIcon,
	},
	{
		path: "/solicitudes",
		name: "Solcitudes",
		icon: FilePlus2,
	},
	{
		path: "/users",
		name: "Usuarios",
		icon: User,
	},
];

const NavLinks = () => {
	return (
		<>
			{navPaths.map((navPath) => (
				<Link
					key={navPath.path}
					className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 [&.active]:font-bold"
					to={navPath.path}
				>
					<navPath.icon className="h-4 w-4" />
					{navPath.name}
				</Link>
			))}
		</>
	);
};

export default NavLinks;
