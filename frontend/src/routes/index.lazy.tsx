import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<>
			<div className="md:h-1/2 border rounded-lg border-muted-foreground p-4">
				<h1>Charts</h1>
			</div>

			<div className="md:h-1/2 border rounded-lg border-muted-foreground p-4">
				<h1>Table</h1>
			</div>
		</>
	);
}
