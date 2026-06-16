"use client";

import {
	Building2,
	GalleryHorizontal,
	LayoutDashboard,
	LogOut,
	Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { clearToken } from "#/modules/auth";

export type AdminSection = "overview" | "properties" | "gallery" | "leads";

interface Props {
	section: AdminSection;
	onSection: (s: AdminSection) => void;
}

const sectionItems: {
	icon: React.ReactNode;
	label: string;
	key: AdminSection;
}[] = [
	{
		icon: <LayoutDashboard size={18} />,
		label: "Visão Geral",
		key: "overview",
	},
	{
		icon: <Building2 size={18} />,
		label: "Imóveis",
		key: "properties",
	},
	{
		icon: <Users size={18} />,
		label: "Leads",
		key: "leads",
	},
	{
		icon: <GalleryHorizontal size={18} />,
		label: "Galeria de Vendas",
		key: "gallery",
	},
];

export function SideNav({ section, onSection }: Props) {
	const router = useRouter();

	function handleSignOut() {
		clearToken();
		router.push("/login");
	}

	return (
		<nav className="h-screen w-64 fixed left-0 top-0 bg-surface-container-low shadow-lg flex flex-col p-4 gap-1 z-50">
			<div className="px-3 pt-2 pb-5 mb-2 border-b border-surface-variant">
				<span
					style={{ fontFamily: "'Monsieur La Doulaise', cursive" }}
					className="text-4xl font-normal tracking-wide text-primary"
				>
					Fabiana Rocha
				</span>
				<p className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant mt-1">
					Painel Administrativo
				</p>
			</div>

			<ul className="flex flex-col gap-1 flex-grow">
				{sectionItems.map((item) => (
					<li key={item.key}>
						<button
							type="button"
							onClick={() => onSection(item.key)}
							className={[
								"w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left",
								section === item.key
									? "bg-primary-container text-on-primary-container font-bold shadow-sm translate-x-1"
									: "text-on-surface-variant hover:bg-surface-variant",
							].join(" ")}
						>
							{item.icon}
							<span className="text-sm flex-grow">{item.label}</span>
						</button>
					</li>
				))}
			</ul>

			<div className="pt-4 border-t border-surface-variant">
				<button
					type="button"
					onClick={handleSignOut}
					className="flex items-center gap-3 px-3 py-2.5 text-on-surface-variant hover:bg-error-container hover:text-on-error-container rounded-lg transition-colors w-full text-left text-sm"
				>
					<LogOut size={18} />
					Sair
				</button>
			</div>
		</nav>
	);
}
