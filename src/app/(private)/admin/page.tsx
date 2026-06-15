"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GallerySalesPanel } from "#/components/admin/GallerySalesPanel";
import { LeadsList } from "#/components/admin/LeadsList";
import { LeadsPanel } from "#/components/admin/LeadsPanel";
import { PropertiesTable } from "#/components/admin/PropertiesTable";
import { type AdminSection, SideNav } from "#/components/admin/SideNav";
import { isAuthenticated } from "#/modules/auth";
import {
	type AdminPropertyListItem,
	PropertyFormModal,
	useDeleteProperty,
} from "#/modules/properties";

const SECTION_TITLE: Record<AdminSection, { title: string; subtitle: string }> =
	{
		overview: {
			title: "Overview",
			subtitle: "Here's what's happening with your portfolio today.",
		},
		properties: {
			title: "Properties",
			subtitle: "Manage all your property listings.",
		},
		gallery: {
			title: "Gallery Sales",
			subtitle: "Manage sold properties shown on the About page.",
		},
		leads: {
			title: "Leads Inbox",
			subtitle: "Manage and reply to potential clients.",
		},
	};

export default function AdminPage() {
	const router = useRouter();
	const [isChecking, setIsChecking] = useState(true);

	useEffect(() => {
		if (!isAuthenticated()) {
			router.push("/login?redirect=/admin");
		} else {
			setIsChecking(false);
		}
	}, [router]);

	const [editingProperty, setEditingProperty] = useState<
		AdminPropertyListItem | undefined
	>(undefined);
	const [showForm, setShowForm] = useState(false);
	const [section, setSection] = useState<AdminSection>("properties");
	const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

	const deleteMutation = useDeleteProperty();

	const { title, subtitle } = SECTION_TITLE[section] || SECTION_TITLE.overview;

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

	if (isChecking) {
		return null; // Or a loading spinner
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
					{section === "properties" && (
						<div className="flex items-center gap-4">
							<button
								type="button"
								onClick={handleAdd}
								className="bg-primary text-on-primary text-sm font-medium px-5 py-2 rounded-lg flex items-center gap-2 hover:shadow-[0_4px_14px_rgba(162,5,19,0.3)] hover:-translate-y-0.5 transition-all duration-200"
							>
								<Plus size={18} />
								Add New Property
							</button>
						</div>
					)}
				</header>

				{/* Section Content */}
				<div className="p-10 max-w-350 mx-auto flex flex-col gap-6">
					{section === "overview" && (
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
							<PropertiesTable
								onEdit={handleEdit}
								onDelete={setConfirmDeleteId}
							/>
							<LeadsPanel />
						</div>
					)}

					{section === "properties" && (
						<PropertiesTable
							onEdit={handleEdit}
							onDelete={setConfirmDeleteId}
						/>
					)}

					{section === "gallery" && <GallerySalesPanel />}
					{section === "leads" && <LeadsList />}
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
					className="fixed inset-0 z-110 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 w-full cursor-default"
					onClick={(e) =>
						e.target === e.currentTarget && setConfirmDeleteId(null)
					}
					onKeyDown={(e) => e.key === "Escape" && setConfirmDeleteId(null)}
				>
					<div className="bg-surface rounded-2xl shadow-2xl w-full max-sm p-6 flex flex-col gap-4 cursor-auto text-left mx-4">
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
