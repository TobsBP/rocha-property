import { CalendarDays, ImageOff, Pencil, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { GallerySale } from "#/modules/gallery-sales";
import { useDeleteGallerySale, useGallerySales } from "#/modules/gallery-sales";
import { GallerySaleFormModal } from "./GallerySaleFormModal";

function formatDate(iso: string) {
	return new Date(iso).toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	});
}

export function GallerySalesPanel() {
	const { data, isLoading } = useGallerySales(1, 20);
	const deleteMutation = useDeleteGallerySale();

	const [modalOpen, setModalOpen] = useState(false);
	const [editing, setEditing] = useState<GallerySale | undefined>(undefined);
	const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

	const sales = data?.data ?? [];

	function openCreate() {
		setEditing(undefined);
		setModalOpen(true);
	}

	function openEdit(sale: GallerySale) {
		setEditing(sale);
		setModalOpen(true);
	}

	function handleDelete(id: string) {
		setConfirmDeleteId(id);
	}

	async function confirmDelete() {
		if (!confirmDeleteId) return;
		await deleteMutation.mutateAsync(confirmDeleteId);
		setConfirmDeleteId(null);
	}

	return (
		<>
			<div className="bg-surface rounded-xl border border-surface-variant shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
				<div className="p-5 border-b border-surface-variant flex justify-between items-center">
					<div>
						<h3 className="text-lg font-semibold text-on-surface">
							Galeria de vendas
						</h3>
						<p className="text-xs text-on-surface-variant mt-0.5">
							{data?.meta.total ?? 0} imóvel
							{(data?.meta.total ?? 0) !== 1 ? "is" : ""} cadastrado
							{(data?.meta.total ?? 0) !== 1 ? "s" : ""}
						</p>
					</div>
					<button
						type="button"
						onClick={openCreate}
						className="bg-primary text-on-primary text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 hover:shadow-[0_4px_14px_rgba(162,5,19,0.3)] hover:-translate-y-0.5 transition-all duration-200"
					>
						<Plus size={16} />
						Adicionar
					</button>
				</div>

				{isLoading ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
						{Array.from({ length: 6 }).map((_, i) => (
							<div
								// biome-ignore lint/suspicious/noArrayIndexKey: skeleton
								key={i}
								className="rounded-xl border border-surface-variant overflow-hidden animate-pulse"
							>
								<div className="aspect-video bg-surface-container-high" />
								<div className="p-4 flex flex-col gap-2">
									<div className="h-3 w-24 bg-surface-container-high rounded" />
									<div className="h-3 w-full bg-surface-container-high rounded" />
								</div>
							</div>
						))}
					</div>
				) : sales.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-20 gap-3 text-on-surface-variant">
						<ImageOff size={36} className="text-outline" />
						<p className="text-sm font-medium">Nenhum item na galeria ainda.</p>
						<button
							type="button"
							onClick={openCreate}
							className="text-sm font-semibold text-primary hover:underline"
						>
							Adicionar o primeiro
						</button>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
						{sales.map((sale) => (
							<div
								key={sale.id}
								className="rounded-xl border border-surface-variant overflow-hidden group bg-surface-container-lowest hover:border-primary/30 transition-colors"
							>
								<div className="aspect-video overflow-hidden bg-surface-container-high relative">
									<Image
										src={sale.imgUrls[0]}
										alt={sale.description}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
									/>
									<div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
										<button
											type="button"
											onClick={() => openEdit(sale)}
											className="w-7 h-7 rounded-full bg-surface/90 backdrop-blur-sm flex items-center justify-center text-on-surface hover:bg-surface transition-colors shadow"
											title="Editar"
										>
											<Pencil size={13} />
										</button>
										<button
											type="button"
											onClick={() => handleDelete(sale.id)}
											className="w-7 h-7 rounded-full bg-surface/90 backdrop-blur-sm flex items-center justify-center text-error hover:bg-error-container transition-colors shadow"
											title="Excluir"
										>
											<Trash2 size={13} />
										</button>
									</div>
								</div>
								<div className="p-4 flex flex-col gap-1.5">
									<div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
										<CalendarDays size={12} />
										<span>{formatDate(sale.soldAt)}</span>
									</div>
									<p className="text-sm text-on-surface leading-snug line-clamp-2">
										{sale.description}
									</p>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{modalOpen && (
				<GallerySaleFormModal
					sale={editing}
					onClose={() => {
						setModalOpen(false);
						setEditing(undefined);
					}}
				/>
			)}

			{confirmDeleteId && (
				<button
					type="button"
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 w-full cursor-default"
					onClick={(e) =>
						e.target === e.currentTarget && setConfirmDeleteId(null)
					}
					onKeyDown={(e) => e.key === "Escape" && setConfirmDeleteId(null)}
				>
					<div className="bg-surface rounded-2xl shadow-2xl w-full max-w-sm p-6 flex flex-col gap-4 cursor-auto text-left">
						<h2 className="text-base font-semibold text-on-surface">
							Excluir item da galeria?
						</h2>
						<p className="text-sm text-on-surface-variant">
							Essa ação não pode ser desfeita.
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
		</>
	);
}
