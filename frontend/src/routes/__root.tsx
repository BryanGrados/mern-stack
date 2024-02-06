import NavLinks from "@/components/NavLinks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { BellDot, LayoutGrid, Settings2 } from "lucide-react";

export const Route = createRootRoute({
	component: () => (
		<>
			<div className="h-screen bg-zinc-200 flex flex-col md:p-5 md:flex-row md:gap-5">
				<div className="h-16 bg-zinc-300 w-full flex items-center justify-center md:h-full md:w-32 md:rounded-lg shadow-lg">
					<div className="container h-full w-full">
						<div className="md:hidden flex items-center justify-between w-full h-full gap-5">
							<Button size={"icon"}>
								<LayoutGrid className="fill-white" size={20} />
							</Button>

							<div className="flex-1">
								<Input placeholder="Buscar..." className="bg-white" />
							</div>

							<Button size={"icon"} variant={"ghost"}>
								<BellDot className="fill-white" size={20} />
							</Button>
						</div>

						<div className="hidden md:flex py-4 flex-col items-center justify-between w-full h-full gap-5 ">
							<h1 className="text-sm font-bold text-center">OSIRIS</h1>

							<div className="flex flex-col items-center gap-5 flex-1 text-muted-foreground">
								<NavLinks />
							</div>

							<div className="flex items-center gap-5">
								<Button size={"icon"} variant={"ghost"}>
									<Settings2 className="fill-white" size={20} />
								</Button>
								<Button size={"icon"} variant={"ghost"}>
									<BellDot className="fill-white" size={20} />
								</Button>
							</div>
						</div>
					</div>
				</div>

				<div className="w-full mt-5 md:mt-0 md:bg-zinc-300 md:shadow-lg md:rounded-lg flex flex-col gap-5 md:p-5 container">
					<Outlet />
				</div>
			</div>
			<TanStackRouterDevtools />
		</>
	),
});
