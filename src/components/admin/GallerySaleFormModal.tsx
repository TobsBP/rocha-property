import { ImagePlus, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import type {
	CreateGallerySaleInput,
	GallerySale,
} from "#/modules/gallery-sales";
import {
	uploadGallerySaleImages,
	useCreateGallerySale,
	useUpdateGallerySale,
} from "#/modules/gallery-sales";

interface Props {
	sale?: GallerySale;
	onClose: () => void;
}

const inputClass =
	"border border-surface-variant rounded-lg px-3 py-2.5 text-sm text-on-surface bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/40 w-full";
const labelClass =
	"text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-1 block";

export function GallerySaleFormModal({ sale, onClose }: Props) {
	const isEdit = Boolean(sale);

	const [soldAt, setSoldAt] = useState(sale ? sale.soldAt.slice(0, 10) : "");
	const [description, setDescription] = useState(sale?.description ?? "");
	const [imgUrls, setImgUrls] = useState<string[]>(sale?.imgUrls ?? []);
	const [uploading, setUploading] = useState(false);
	const [uploadError, setUploadError] = useState<string | null>(null);
	const [dragOver, setDragOver] = useState(false);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const create = useCreateGallerySale();
	const update = useUpdateGallerySale(sale?.id ?? "");
	const isPending = create.isPending || update.isPending;

	async function handleFiles(files: File[]) {
		const images = files.filter((f) => f.type.startsWith("image/"));
		if (images.length === 0) {
			setUploadError("Selecione apenas arquivos de imagem.");
			return;
		}
		setUploadError(null);
		setUploading(true);
		try {
			const urls = await uploadGallerySaleImages(images);
			setImgUrls((prev) => [...prev, ...urls]);
		} catch {
			setUploadError("Falha no upload. Tente novamente.");
		} finally {
			setUploading(false);
			if (fileInputRef.current) fileInputRef.current.value = "";
		}
	}

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const files = Array.from(e.target.files ?? []);
		if (files.length) handleFiles(files);
	}

	function handleDrop(e: React.DragEvent) {
		e.preventDefault();
		setDragOver(false);
		const files = Array.from(e.dataTransfer.files);
		if (files.length) handleFiles(files);
	}

	function removeImage(index: number) {
		setImgUrls((prev) => prev.filter((_, i) => i !== index));
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const input: CreateGallerySaleInput = {
			soldAt: new Date(soldAt).toISOString(),
			description,
			imgUrls,
		};
		if (isEdit) {
			await update.mutateAsync(input);
		} else {
			await create.mutateAsync(input);
		}
		onClose();
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
			<button
				type="button"
				aria-label="Fechar"
				className="absolute inset-0 cursor-default"
				onClick={onClose}
			/>
			<div className="relative bg-surface rounded-2xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden max-h-[90vh]">
				{/* Header */}
				<div className="flex items-center justify-between px-6 py-4 border-b border-surface-variant">
					<h2 className="text-lg font-semibold text-on-surface">
						{isEdit ? "Editar venda" : "Nova venda"}
					</h2>
					<button
						type="button"
						onClick={onClose}
						className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
					>
						<X size={18} />
					</button>
				</div>

				<form
					onSubmit={handleSubmit}
					className="flex flex-col gap-5 p-6 overflow-y-auto"
				>
					{/* Imagens */}
					<div className="flex flex-col gap-2">
						<span className={labelClass}>
							Imagens{imgUrls.length > 0 && ` (${imgUrls.length})`}
						</span>

						<input
							ref={fileInputRef}
							type="file"
							accept="image/*"
							multiple
							className="hidden"
							onChange={handleInputChange}
						/>

						{/* Miniaturas já carregadas */}
						{imgUrls.length > 0 && (
							<div className="grid grid-cols-3 gap-2">
								{imgUrls.map((url, i) => (
									<div
										// biome-ignore lint/suspicious/noArrayIndexKey: order matters here
										key={i}
										className="relative rounded-lg overflow-hidden aspect-video border border-surface-variant group"
									>
										<Image
											width={100}
											height={100}
											src={url}
											alt={`Imagem ${i + 1}`}
											className="w-full h-full object-cover"
										/>
										<button
											type="button"
											onClick={() => removeImage(i)}
											className="absolute top-1 right-1 w-5 h-5 rounded-full bg-surface/90 backdrop-blur-sm flex items-center justify-center text-on-surface opacity-0 group-hover:opacity-100 transition-opacity shadow"
										>
											<X size={11} />
										</button>
									</div>
								))}
							</div>
						)}

						{/* Drop zone */}
						<button
							type="button"
							onClick={() => fileInputRef.current?.click()}
							onDragOver={(e) => {
								e.preventDefault();
								setDragOver(true);
							}}
							onDragLeave={() => setDragOver(false)}
							onDrop={handleDrop}
							disabled={uploading}
							className={[
								"w-full rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 py-5 transition-colors cursor-pointer",
								dragOver
									? "border-primary bg-primary-fixed/20"
									: "border-surface-variant hover:border-primary/50 hover:bg-surface-container-low",
							].join(" ")}
						>
							{uploading ? (
								<>
									<Loader2 size={24} className="text-primary animate-spin" />
									<span className="text-sm text-on-surface-variant">
										Enviando…
									</span>
								</>
							) : (
								<>
									<ImagePlus size={24} className="text-outline" />
									<span className="text-sm text-on-surface-variant text-center px-4">
										{imgUrls.length > 0
											? "Adicionar mais imagens"
											: "Clique ou arraste imagens aqui"}
									</span>
									<span className="text-xs text-outline">
										Múltiplos arquivos permitidos
									</span>
								</>
							)}
						</button>

						{uploadError && (
							<p className="text-xs text-error font-medium">{uploadError}</p>
						)}
					</div>

					{/* Data da venda */}
					<div className="flex flex-col gap-1.5">
						<label htmlFor="sold-at" className={labelClass}>
							Data da venda
						</label>
						<input
							id="sold-at"
							type="date"
							required
							value={soldAt}
							onChange={(e) => setSoldAt(e.target.value)}
							className={inputClass}
						/>
					</div>

					{/* Descrição */}
					<div className="flex flex-col gap-1.5">
						<label htmlFor="description" className={labelClass}>
							Descrição
						</label>
						<textarea
							id="description"
							required
							rows={3}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Casa em condomínio fechado vendida em tempo recorde."
							className={`${inputClass} resize-none`}
						/>
					</div>

					{/* Actions */}
					<div className="flex justify-end gap-3 pt-2">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors"
						>
							Cancelar
						</button>
						<button
							type="submit"
							disabled={isPending || uploading || imgUrls.length === 0}
							className="px-5 py-2 rounded-lg text-sm font-semibold bg-primary text-on-primary hover:shadow-[0_4px_14px_rgba(162,5,19,0.3)] hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:pointer-events-none"
						>
							{isPending ? "Salvando…" : isEdit ? "Salvar" : "Adicionar"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
