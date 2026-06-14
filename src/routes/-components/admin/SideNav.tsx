import { Link } from "@tanstack/react-router";
import { Award, BarChart2, Building2, GalleryHorizontal, LogOut, Users } from "lucide-react";

export type AdminSection = "overview" | "gallery";

interface Props {
	section: AdminSection;
	onSection: (s: AdminSection) => void;
}

const ADMIN_AVATAR =
	"https://lh3.googleusercontent.com/aida-public/AB6AXuCxrjSktGOUhtcMl3bJouvr0F44M6ZyIcDJnt4Q79rGDhW-6sVTeMDJYo_J7-jY8Roi45-jgS-QuX8zOt7gTjW608VSNB80wD5v3bRdfTbdRMjCZTb818S7_SY_oVdY5DZ_vg4pGrSm7loNH5scU7f7BxC8IKOxV51VBEePfCxGkWHE21TskBRdVDY6yZQoF77QEASZp0pt8OcodCe-Zq4quDy2kdoAWg0z_ZMCh0sv2CR3upAGblw23l0Lo61QoG8QJmO7Q2Ah9T1-";

export function SideNav({ section, onSection }: Props) {
	const linkItems = [
		{
			icon: <Building2 size={18} />,
			label: "Properties",
			key: "properties",
			to: "/" as const,
			isLink: true,
		},
		{
			icon: <Users size={18} />,
			label: "Leads",
			key: "leads",
			badge: 12,
			to: "/admin" as const,
			isLink: true,
		},
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

	const sectionItems: { icon: React.ReactNode; label: string; key: AdminSection }[] = [
		{
			icon: <GalleryHorizontal size={18} />,
			label: "Gallery Sales",
			key: "gallery",
		},
	];

	return (
		<nav className="h-screen w-64 fixed left-0 top-0 bg-surface-container-low shadow-lg flex flex-col p-4 gap-1 z-50">
			<div className="mb-6 px-2 flex items-center gap-3">
				<div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant flex-shrink-0">
					<img
						src={ADMIN_AVATAR}
						alt="Admin"
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="min-w-0">
					<h2 className="text-sm font-bold text-primary truncate">
						Admin Portal
					</h2>
					<p className="text-xs text-on-surface-variant truncate">
						Management Console
					</p>
				</div>
			</div>

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
							{"badge" in item && item.badge && (
								<span className="bg-error-container text-on-error-container text-xs font-semibold px-2 py-0.5 rounded-full">
									{item.badge}
								</span>
							)}
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
