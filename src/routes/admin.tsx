import { createFileRoute } from "@tanstack/react-router";
import { Bell, Plus } from "lucide-react";
import { useState } from "react";
import { PropertyFormModal } from "#/modules/properties";
import { GallerySalesPanel } from "./-components/admin/GallerySalesPanel";
import { LeadsPanel } from "./-components/admin/LeadsPanel";
import { MetricCards } from "./-components/admin/MetricCards";
import { PropertiesTable } from "./-components/admin/PropertiesTable";
import { type AdminSection, SideNav } from "./-components/admin/SideNav";

export const Route = createFileRoute("/admin")({ component: AdminPage });

const SECTION_TITLE: Record<AdminSection, { title: string; subtitle: string }> = {
	overview: {
		title: "Overview",
		subtitle: "Here's what's happening with your portfolio today.",
	},
	gallery: {
		title: "Gallery Sales",
		subtitle: "Manage sold properties shown on the About page.",
	},
};

function AdminPage() {
	const [showForm, setShowForm] = useState(false);
	const [section, setSection] = useState<AdminSection>("overview");

	const { title, subtitle } = SECTION_TITLE[section];

	return (
		<div
			className="min-h-screen bg-[#f9f9f9] text-on-background font-[Inter,ui-sans-serif,system-ui,sans-serif] antialiased"
			style={{ overflowX: "hidden" }}
		>
			<SideNav section={section} onSection={setSection} />

			<main className="ml-64 min-h-screen pb-10">
				{/* Header */}
				<header className="sticky top-0 z-40 bg-[#f9f9f9]/80 backdrop-blur-md border-b border-surface-variant px-10 py-4 flex justify-between items-center">
					<div>
						<h1 className="text-3xl font-semibold text-on-surface tracking-tight">
							{title}
						</h1>
						<p className="text-sm text-on-surface-variant mt-0.5">{subtitle}</p>
					</div>
					<div className="flex items-center gap-4">
						<button
							type="button"
							className="w-10 h-10 rounded-full border border-surface-variant bg-surface flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors relative"
						>
							<Bell size={18} />
							<span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
						</button>
						{section === "overview" && (
							<button
								type="button"
								onClick={() => setShowForm(true)}
								className="bg-primary text-on-primary text-sm font-medium px-5 py-2 rounded-lg flex items-center gap-2 hover:shadow-[0_4px_14px_rgba(162,5,19,0.3)] hover:-translate-y-0.5 transition-all duration-200"
							>
								<Plus size={18} />
								Add New Property
							</button>
						)}
					</div>
				</header>

				{/* Section Content */}
				<div className="p-10 max-w-400 mx-auto flex flex-col gap-6">
					{section === "overview" && (
						<>
							<MetricCards />
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
								<PropertiesTable />
								<LeadsPanel />
							</div>
						</>
					)}

					{section === "gallery" && <GallerySalesPanel />}
				</div>
			</main>

			{showForm && <PropertyFormModal onClose={() => setShowForm(false)} />}
		</div>
	);
}
