import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	Link,
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { House, SearchX } from "lucide-react";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Imóveis Rocha",
			},
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap",
			},
		],
	}),
	shellComponent: RootDocument,
	notFoundComponent: NotFound,
});

function NotFound() {
	return (
		<div className="min-h-screen bg-[#f9f9f9] flex flex-col items-center justify-center gap-6 px-4 font-[Inter,ui-sans-serif,system-ui,sans-serif]">
			<SearchX size={56} className="text-outline" strokeWidth={1.5} />
			<div className="text-center">
				<h1 className="text-6xl font-black text-primary leading-none">404</h1>
				<p className="text-lg font-semibold text-on-surface mt-2">
					Página não encontrada
				</p>
				<p className="text-sm text-on-surface-variant mt-1">
					O endereço que você acessou não existe.
				</p>
			</div>
			<Link
				to="/"
				className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg text-sm font-bold no-underline hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(162,5,19,0.3)] transition-all"
			>
				<House size={16} />
				Voltar para o início
			</Link>
		</div>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
