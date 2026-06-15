import { Link } from "@tanstack/react-router";
import {
	Award,
	BarChart2,
	Building2,
	GalleryHorizontal,
	LogOut,
	Users,
} from "lucide-react";

export type AdminSection = "overview" | "properties" | "gallery" | "leads";

interface Props {
	section: AdminSection;
	onSection: (s: AdminSection) => void;
}

export function SideNav({ section, onSection }: Props) {
	const linkItems = [
		{
			icon: <Award size={18} />,
			label: "Brokers",
			key: "brokers",
			to: "/admin" as const,
			isLink: true,
		},
		{
			icon: <BarChart2 size={18} />,
			label: "Metrics",
			key: "metrics",
			to: "/admin" as const,
			isLink: true,
		},
	];

	const sectionItems: {
		icon: React.ReactNode;
		label: string;
		key: AdminSection;
	}[] = [
		{
			icon: <Building2 size={18} />,
			label: "Properties",
			key: "properties",
		},
		{
			icon: <Users size={18} />,
			label: "Leads",
			key: "leads",
		},
		{
			icon: <GalleryHorizontal size={18} />,
			label: "Gallery Sales",
			key: "gallery",
		},
	];

	return (
		<nav className="h-screen w-64 fixed left-0 top-0 bg-surface-container-low shadow-lg flex flex-col p-4 gap-1 z-50">
			<ul className="flex flex-col gap-1 flex-grow">
				<li>
					<button
						type="button"
						onClick={() => onSection("overview")}
						className={[
							"w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left",
							section === "overview"
								? "bg-primary-container text-on-primary-container font-bold shadow-sm translate-x-1"
								: "text-on-surface-variant hover:bg-surface-variant",
						].join(" ")}
					>
						<BarChart2 size={18} />
						<span className="text-sm flex-grow">Overview</span>
					</button>
				</li>

				{sectionItems.map((item) => (
					<li key={item.key}>
						<button
							type="button"
							onClick={() => onSection(item.key)}
							className={[
								"w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left",
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

				<li className="mt-2 pt-2 border-t border-surface-variant">
					{linkItems.map((item) => (
						<Link
							key={item.key}
							to={item.to}
							className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors no-underline text-on-surface-variant hover:bg-surface-variant"
						>
							{item.icon}
							<span className="text-sm flex-grow">{item.label}</span>
						</Link>
					))}
				</li>
			</ul>

			<div className="pt-4 border-t border-surface-variant">
				<button
					type="button"
					className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-colors w-full text-left text-sm"
				>
					<LogOut size={18} />
					Sign Out
				</button>
			</div>
		</nav>
	);
}
