import { Check, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePropertyImages } from "../properties.hooks";
import type { PropertyImageResource } from "../properties.types";

interface GalleryPickerModalProps {
	alreadySelected: string[];
	onConfirm: (urls: string[]) => void;
	onClose: () => void;
}

export function GalleryPickerModal({
	alreadySelected,
	onConfirm,
	onClose,
}: GalleryPickerModalProps) {
	const [nextCursor, setNextCursor] = useState<string | undefined>();
	const [allResources, setAllResources] = useState<PropertyImageResource[]>([]);
	const [selected, setSelected] = useState<Set<string>>(
		new Set(alreadySelected),
	);

	const { data, isFetching, isError } = usePropertyImages({
		maxResults: 30,
		nextCursor,
	});

	useEffect(() => {
		if (!data) return;
		setAllResources((prev) => {
			const known = new Set(prev.map((r) => r.publicId));
			const incoming = data.resources.filter((r) => !known.has(r.publicId));
			return incoming.length === 0 ? prev : [...prev, ...incoming];
		});
	}, [data]);

	function toggle(url: string) {
		setSelected((prev) => {
			const next = new Set(prev);
			if (next.has(url)) next.delete(url);
			else next.add(url);
			return next;
		});
	}

	return (
		<div className="fixed inset-0 z-110 flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
			<button
				type="button"
				aria-label="Fechar"
				onClick={onClose}
				className="absolute inset-0 cursor-default"
			/>
			<div className="relative my-8 flex w-full max-w-3xl flex-col rounded-2xl border border-surface-variant bg-surface-container-lowest shadow-[0_12px_48px_rgba(0,0,0,0.25)]">
				<header className="flex items-center justify-between border-b border-surface-variant px-6 py-4">
					<div>
						<h3 className="text-base font-semibold text-on-surface">
							Galeria de imagens
						</h3>
						<p className="text-xs text-on-surface-variant">
							Clique nas imagens para selecioná-las
						</p>
					</div>
					<button
						type="button"
						onClick={onClose}
						aria-label="Fechar"
						className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-variant"
					>
						<X size={18} />
					</button>
				</header>

				<div className="min-h-48 p-4">
					{isError && (
						<p className="py-8 text-center text-sm text-error">
							Não foi possível carregar a galeria.
						</p>
					)}

					{!isError && allResources.length === 0 && !isFetching && (
						<p className="py-8 text-center text-sm text-on-surface-variant">
							Nenhuma imagem na galeria.
						</p>
					)}

					{allResources.length > 0 && (
						<div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
							{allResources.map((res) => {
								const isSelected = selected.has(res.url);
								return (
									<button
										key={res.publicId}
										type="button"
										onClick={() => toggle(res.url)}
										className={[
											"group relative aspect-square overflow-hidden rounded-lg border-2 transition-all",
											isSelected
												? "border-primary ring-2 ring-primary/40"
												: "border-transparent hover:border-primary/40",
										].join(" ")}
									>
										<Image
											src={res.url}
											alt={res.publicId}
											fill
											sizes="160px"
											className="object-cover"
										/>
										{isSelected && (
											<span className="absolute inset-0 flex items-center justify-center bg-primary/30">
												<span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary shadow">
													<Check size={14} className="text-on-primary" />
												</span>
											</span>
										)}
									</button>
								);
							})}
						</div>
					)}

					{isFetching && (
						<div className="flex justify-center py-6">
							<Loader2 size={24} className="animate-spin text-primary" />
						</div>
					)}

					{data?.nextCursor && !isFetching && (
						<button
							type="button"
							onClick={() => setNextCursor(data.nextCursor ?? undefined)}
							className="mt-4 w-full rounded-lg border border-outline-variant py-2 text-sm text-on-surface-variant transition-colors hover:bg-surface-variant"
						>
							Carregar mais
						</button>
					)}
				</div>

				<footer className="flex items-center justify-between border-t border-surface-variant px-6 py-4">
					<span className="text-xs text-on-surface-variant">
						{selected.size > 0
							? `${selected.size} imagem${selected.size !== 1 ? "ns" : ""} selecionada${selected.size !== 1 ? "s" : ""}`
							: "Nenhuma selecionada"}
					</span>
					<div className="flex gap-3">
						<button
							type="button"
							onClick={onClose}
							className="rounded-lg border border-outline-variant px-4 py-2 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-variant"
						>
							Cancelar
						</button>
						<button
							type="button"
							onClick={() => onConfirm(Array.from(selected))}
							className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary shadow-sm transition-all hover:-translate-y-px hover:shadow-md disabled:opacity-60"
						>
							{selected.size > 0 ? `Confirmar (${selected.size})` : "Confirmar"}
						</button>
					</div>
				</footer>
			</div>
		</div>
	);
}
