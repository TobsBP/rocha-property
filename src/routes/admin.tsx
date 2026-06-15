import { createFileRoute, redirect } from "@tanstack/react-router";
import { Bell, Plus } from "lucide-react";
import { useState } from "react";
import { isAuthenticated } from "#/modules/auth";
import {
	type AdminPropertyListItem,
	PropertyFormModal,
	useDeleteProperty,
} from "#/modules/properties";
import { GallerySalesPanel } from "./-components/admin/GallerySalesPanel";
import { LeadsPanel } from "./-components/admin/LeadsPanel";
import { PropertiesTable } from "./-components/admin/PropertiesTable";
import { type AdminSection, SideNav } from "./-components/admin/SideNav";

export const Route = createFileRoute("/admin")({
	beforeLoad: () => {
		if (!isAuthenticated()) {
			throw redirect({
				to: "/login",
				search: {
					redirect: "/admin",
				},
			});
		}
	},
	component: AdminPage,
});

const SECTION_TITLE: Record<AdminSection, { title: string; subtitle: string }> =
	{
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
	const [editingProperty, setEditingProperty] = useState<
		AdminPropertyListItem | undefined
	>(undefined);
	const [showForm, setShowForm] = useState(false);
	const [section, setSection] = useState<AdminSection>("overview");
	const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

	const deleteMutation = useDeleteProperty();

	const { title, subtitle } = SECTION_TITLE[section];

	function handleEdit(p: AdminPropertyListItem) {
		setEditingProperty(p);
		setShowForm(true);
	}

	function handleAdd() {
		setEditingProperty(undefined);
		setShowForm(true);
	}

	async function confirmDelete() {
		if (!confirmDeleteId) return;
		await deleteMutation.mutateAsync(confirmDeleteId);
		setConfirmDeleteId(null);
	}

	return (
		<div
			className="min-h-screen bg-background text-foreground font-[Inter,ui-sans-serif,system-ui,sans-serif] antialiased"
			style={{ overflowX: "hidden" }}
		>
			<SideNav section={section} onSection={setSection} />

			<main className="ml-64 min-h-screen pb-10">
				{/* Header */}
				<header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-surface-variant px-10 py-4 flex justify-between items-center">
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
								onClick={handleAdd}
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
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
							<PropertiesTable
								onEdit={handleEdit}
								onDelete={setConfirmDeleteId}
							/>
							<LeadsPanel />
						</div>
					)}

					{section === "gallery" && <GallerySalesPanel />}
				</div>
			</main>

			{showForm && (
				<PropertyFormModal
					property={editingProperty}
					onClose={() => {
						setShowForm(false);
						setEditingProperty(undefined);
					}}
				/>
			)}

			{confirmDeleteId && (
				<button
					type="button"
					className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 w-full cursor-default"
					onClick={(e) =>
						e.target === e.currentTarget && setConfirmDeleteId(null)
					}
					onKeyDown={(e) => e.key === "Escape" && setConfirmDeleteId(null)}
				>
					<div className="bg-surface rounded-2xl shadow-2xl w-full max-w-sm p-6 flex flex-col gap-4 cursor-auto text-left">
						<h2 className="text-base font-semibold text-on-surface">
							Excluir imóvel?
						</h2>
						<p className="text-sm text-on-surface-variant">
							Essa ação não pode ser desfeita e removerá o imóvel do site.
						</p>
						<div className="flex justify-end gap-3">
							<button
								type="button"
								onClick={() => setConfirmDeleteId(null)}
								className="px-4 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors"
							>
								Cancelar
							</button>
							<button
								type="button"
								onClick={confirmDelete}
								disabled={deleteMutation.isPending}
								className="px-4 py-2 rounded-lg text-sm font-semibold bg-error text-on-error hover:opacity-90 transition-opacity disabled:opacity-60"
							>
								{deleteMutation.isPending ? "Excluindo…" : "Excluir"}
							</button>
						</div>
					</div>
				</button>
			)}
		</div>
	);
}
