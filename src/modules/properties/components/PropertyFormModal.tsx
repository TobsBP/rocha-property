import { ImagePlus, Images, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { uploadPropertyImages } from "../properties.api";
import { useCreateProperty, useUpdateProperty } from "../properties.hooks";
import type {
	AdminPropertyListItem,
	CreatePropertyInput,
	PropertyPurpose,
	PropertyStatus,
	PropertyType,
} from "../properties.types";
import { GalleryPickerModal } from "./GalleryPickerModal";

const TYPE_OPTIONS: { value: PropertyType; label: string }[] = [
	{ value: "casa", label: "Casa" },
	{ value: "apartamento", label: "Apartamento" },
	{ value: "terreno", label: "Terreno" },
	{ value: "cobertura", label: "Cobertura" },
	{ value: "loft", label: "Loft" },
	{ value: "comercial", label: "Comercial" },
	{ value: "sitio", label: "Sítio" },
	{ value: "chacara", label: "Chácara" },
	{ value: "fazenda", label: "Fazenda" },
];

const PURPOSE_OPTIONS: { value: PropertyPurpose; label: string }[] = [
	{ value: "venda", label: "Venda" },
	{ value: "aluguel", label: "Aluguel" },
];

const STATUS_OPTIONS: { value: PropertyStatus; label: string }[] = [
	{ value: "active", label: "Ativo" },
	{ value: "pending", label: "Pendente" },
	{ value: "sold", label: "Vendido" },
	{ value: "draft", label: "Rascunho" },
];

const EMPTY: CreatePropertyInput = {
	title: "",
	description: "",
	price: "",
	condoFee: "",
	type: "casa",
	purpose: "venda",
	status: "active",
	area: 0,
	bedrooms: 0,
	suites: 0,
	bathrooms: 0,
	parkingSpaces: 0,
	isExclusive: false,
	isNew: false,
	addressStreet: "",
	neighborhood: "",
	city: "",
	state: "",
	imageUrls: [],
};

const inputClass =
	"w-full rounded-lg border border-outline-variant bg-surface-bright px-3 py-2.5 text-sm text-on-surface outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary";
const labelClass = "mb-1 block text-xs font-semibold text-on-surface-variant";

export function PropertyFormModal({
	property,
	onClose,
}: {
	property?: AdminPropertyListItem;
	onClose: () => void;
}) {
	const isEdit = Boolean(property);
	const [form, setForm] = useState<CreatePropertyInput>(EMPTY);

	useEffect(() => {
		if (property) {
			setForm({
				title: property.title || property.name || "",
				description: property.description || "",
				price: property.price || "",
				condoFee: property.condoFee || "",
				type: property.type || "casa",
				purpose: property.purpose || "venda",
				status: property.status || "active",
				area: property.area || 0,
				bedrooms: property.bedrooms || 0,
				suites: property.suites || 0,
				bathrooms: property.bathrooms || 0,
				parkingSpaces: property.parkingSpaces || 0,
				isExclusive: property.isExclusive || false,
				isNew: property.isNew || false,
				addressStreet: property.addressStreet || "",
				neighborhood: property.neighborhood || "",
				city: property.city || "",
				state: property.state || "",
				imageUrls: property.imageUrls ?? [],
			});
		}
	}, [property]);

	const createMutation = useCreateProperty();
	const updateMutation = useUpdateProperty(property?.id || "");
	const mutation = isEdit ? updateMutation : createMutation;
	const { mutate, isPending, error } = mutation;

	const [uploading, setUploading] = useState(false);
	const [uploadError, setUploadError] = useState<string | null>(null);
	const [dragOver, setDragOver] = useState(false);
	const [validationError, setValidationError] = useState<string | null>(null);
	const [galleryOpen, setGalleryOpen] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	function set<K extends keyof CreatePropertyInput>(
		key: K,
		value: CreatePropertyInput[K],
	) {
		setForm((prev) => ({ ...prev, [key]: value }));
	}

	async function handleFiles(files: File[]) {
		const images = files.filter((f) => f.type.startsWith("image/"));
		if (images.length === 0) {
			setUploadError("Selecione apenas arquivos de imagem.");
			return;
		}
		setUploadError(null);
		setUploading(true);
		try {
			const urls = await uploadPropertyImages(images);
			setForm((prev) => ({ ...prev, imageUrls: [...prev.imageUrls, ...urls] }));
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
		setForm((prev) => ({
			...prev,
			imageUrls: prev.imageUrls.filter((_, i) => i !== index),
		}));
	}

	function validate(): string | null {
		const required: [string, string][] = [
			[form.title.trim(), "Título"],
			[form.description.trim(), "Descrição"],
			[form.price.trim(), "Preço"],
			[form.addressStreet.trim(), "Endereço"],
			[form.neighborhood.trim(), "Bairro"],
			[form.city.trim(), "Cidade"],
			[form.state.trim(), "Estado (UF)"],
		];
		const missing = required
			.filter(([value]) => !value)
			.map(([, label]) => label);
		if (form.imageUrls.length === 0) missing.push("Imagens");
		if (missing.length > 0) {
			return `Preencha os campos obrigatórios: ${missing.join(", ")}.`;
		}
		return null;
	}

	function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		const message = validate();
		if (message) {
			setValidationError(message);
			return;
		}
		setValidationError(null);
		mutate(form, { onSuccess: onClose });
	}

	function handleGalleryConfirm(urls: string[]) {
		setForm((prev) => {
			const existing = new Set(prev.imageUrls);
			const added = urls.filter((u) => !existing.has(u));
			return { ...prev, imageUrls: [...prev.imageUrls, ...added] };
		});
		setGalleryOpen(false);
	}

	return (
		<>
			{galleryOpen && (
				<GalleryPickerModal
					alreadySelected={form.imageUrls}
					onConfirm={handleGalleryConfirm}
					onClose={() => setGalleryOpen(false)}
				/>
			)}
			<div className="fixed inset-0 z-100 flex items-start justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-sm">
				<button
					type="button"
					aria-label="Fechar"
					onClick={onClose}
					className="absolute inset-0 cursor-default"
				/>
				<div className="relative my-8 w-full max-w-4xl rounded-2xl border border-surface-variant bg-surface-container-lowest shadow-[0_12px_48px_rgba(0,0,0,0.18)]">
					<header className="sticky top-0 flex items-center justify-between rounded-t-2xl border-b border-surface-variant bg-surface-container-lowest px-6 py-4">
						<div>
							<h2 className="text-lg font-semibold text-on-surface">
								{isEdit ? "Editar Imóvel" : "Novo Imóvel"}
							</h2>
							<p className="text-sm text-on-surface-variant">
								{isEdit
									? "Altere os dados para atualizar o cadastro."
									: "Preencha os dados para cadastrar."}
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

					<form
						onSubmit={handleSubmit}
						noValidate
						className="flex flex-col gap-5 p-6"
					>
						{(validationError || error) && (
							<div className="rounded-lg bg-error-container px-4 py-3 text-sm font-medium text-on-error-container">
								{validationError ??
									(error instanceof Error
										? error.message
										: "Não foi possível concluir a operação.")}
							</div>
						)}

						<div>
							<label htmlFor="title" className={labelClass}>
								Título
							</label>
							<input
								id="title"
								required
								value={form.title}
								onChange={(e) => set("title", e.target.value)}
								placeholder="Ex.: Casa Térrea Alphaville"
								className={inputClass}
							/>
						</div>

						<div>
							<label htmlFor="description" className={labelClass}>
								Descrição
							</label>
							<textarea
								id="description"
								rows={3}
								value={form.description}
								onChange={(e) => set("description", e.target.value)}
								className={`${inputClass} resize-none`}
							/>
						</div>

						<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
							<div>
								<label htmlFor="type" className={labelClass}>
									Tipo
								</label>
								<select
									id="type"
									value={form.type}
									onChange={(e) => set("type", e.target.value as PropertyType)}
									className={inputClass}
								>
									{TYPE_OPTIONS.map((o) => (
										<option key={o.value} value={o.value}>
											{o.label}
										</option>
									))}
								</select>
							</div>
							<div>
								<label htmlFor="purpose" className={labelClass}>
									Finalidade
								</label>
								<select
									id="purpose"
									value={form.purpose}
									onChange={(e) =>
										set("purpose", e.target.value as PropertyPurpose)
									}
									className={inputClass}
								>
									{PURPOSE_OPTIONS.map((o) => (
										<option key={o.value} value={o.value}>
											{o.label}
										</option>
									))}
								</select>
							</div>
							<div>
								<label htmlFor="status" className={labelClass}>
									Status
								</label>
								<select
									id="status"
									value={form.status}
									onChange={(e) =>
										set("status", e.target.value as PropertyStatus)
									}
									className={inputClass}
								>
									{STATUS_OPTIONS.map((o) => (
										<option key={o.value} value={o.value}>
											{o.label}
										</option>
									))}
								</select>
							</div>
						</div>

						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div>
								<label htmlFor="price" className={labelClass}>
									Preço (R$)
								</label>
								<input
									id="price"
									inputMode="numeric"
									required
									value={form.price}
									onChange={(e) => set("price", e.target.value)}
									placeholder="2450000"
									className={inputClass}
								/>
							</div>
							<div>
								<label htmlFor="condoFee" className={labelClass}>
									Condomínio (R$)
								</label>
								<input
									id="condoFee"
									inputMode="numeric"
									value={form.condoFee}
									onChange={(e) => set("condoFee", e.target.value)}
									placeholder="0"
									className={inputClass}
								/>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
							{(
								[
									["area", "Área (m²)"],
									["bedrooms", "Quartos"],
									["suites", "Suítes"],
									["bathrooms", "Banheiros"],
									["parkingSpaces", "Vagas"],
								] as const
							).map(([key, label]) => (
								<div key={key}>
									<label htmlFor={key} className={labelClass}>
										{label}
									</label>
									<input
										id={key}
										type="number"
										min={0}
										value={form[key]}
										onChange={(e) => set(key, Number(e.target.value))}
										className={inputClass}
									/>
								</div>
							))}
						</div>

						<div>
							<label htmlFor="addressStreet" className={labelClass}>
								Endereço
							</label>
							<input
								id="addressStreet"
								value={form.addressStreet}
								onChange={(e) => set("addressStreet", e.target.value)}
								placeholder="Rua, número"
								className={inputClass}
							/>
						</div>

						<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
							<div>
								<label htmlFor="neighborhood" className={labelClass}>
									Bairro
								</label>
								<input
									id="neighborhood"
									value={form.neighborhood}
									onChange={(e) => set("neighborhood", e.target.value)}
									className={inputClass}
								/>
							</div>
							<div>
								<label htmlFor="city" className={labelClass}>
									Cidade
								</label>
								<input
									id="city"
									value={form.city}
									onChange={(e) => set("city", e.target.value)}
									className={inputClass}
								/>
							</div>
							<div>
								<label htmlFor="state" className={labelClass}>
									Estado (UF)
								</label>
								<input
									id="state"
									maxLength={2}
									value={form.state}
									onChange={(e) => set("state", e.target.value.toUpperCase())}
									placeholder="SP"
									className={inputClass}
								/>
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<span className={labelClass}>
								Imagens
								{form.imageUrls.length > 0 && ` (${form.imageUrls.length})`}
							</span>

							<input
								ref={fileInputRef}
								type="file"
								accept="image/*"
								multiple
								className="hidden"
								onChange={handleInputChange}
							/>

							{form.imageUrls.length > 0 && (
								<div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
									{form.imageUrls.map((url, i) => (
										<div
											// biome-ignore lint/suspicious/noArrayIndexKey: a ordem importa (1ª é a capa)
											key={i}
											className="group relative aspect-video overflow-hidden rounded-lg border border-surface-variant"
										>
											<Image
												width={120}
												height={90}
												src={url}
												alt={`Imagem ${i + 1}`}
												className="h-full w-full object-cover"
											/>
											{i === 0 && (
												<span className="absolute bottom-1 left-1 rounded bg-primary/90 px-1.5 py-0.5 text-[10px] font-semibold text-on-primary">
													Capa
												</span>
											)}
											<button
												type="button"
												onClick={() => removeImage(i)}
												className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-surface/90 text-on-surface opacity-0 shadow backdrop-blur-sm transition-opacity group-hover:opacity-100"
											>
												<X size={11} />
											</button>
										</div>
									))}
								</div>
							)}

							<div className="flex gap-2">
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
										"flex flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-5 transition-colors",
										dragOver
											? "border-primary bg-primary-fixed/20"
											: "border-surface-variant hover:border-primary/50 hover:bg-surface-container-low",
									].join(" ")}
								>
									{uploading ? (
										<>
											<Loader2
												size={24}
												className="animate-spin text-primary"
											/>
											<span className="text-sm text-on-surface-variant">
												Enviando…
											</span>
										</>
									) : (
										<>
											<ImagePlus size={24} className="text-outline" />
											<span className="px-4 text-center text-sm text-on-surface-variant">
												{form.imageUrls.length > 0
													? "Enviar novas imagens"
													: "Clique ou arraste imagens aqui"}
											</span>
											<span className="text-xs text-outline">
												Múltiplos arquivos permitidos
											</span>
										</>
									)}
								</button>

								<button
									type="button"
									onClick={() => setGalleryOpen(true)}
									disabled={uploading}
									className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-surface-variant px-5 py-5 transition-colors hover:border-primary/50 hover:bg-surface-container-low disabled:opacity-60"
								>
									<Images size={24} className="text-outline" />
									<span className="text-center text-sm text-on-surface-variant">
										Galeria
									</span>
								</button>
							</div>

							{uploadError && (
								<p className="text-xs font-medium text-error">{uploadError}</p>
							)}
						</div>

						<div className="flex flex-wrap gap-6 pt-1">
							<label className="flex items-center gap-2 text-sm text-on-surface-variant">
								<input
									type="checkbox"
									checked={form.isExclusive}
									onChange={(e) => set("isExclusive", e.target.checked)}
									className="h-4 w-4 rounded border-outline-variant accent-primary"
								/>
								Exclusivo
							</label>
							<label className="flex items-center gap-2 text-sm text-on-surface-variant">
								<input
									type="checkbox"
									checked={form.isNew}
									onChange={(e) => set("isNew", e.target.checked)}
									className="h-4 w-4 rounded border-outline-variant accent-primary"
								/>
								Novo
							</label>
						</div>

						<div className="flex justify-end gap-3 border-t border-surface-variant pt-5">
							<button
								type="button"
								onClick={onClose}
								className="rounded-lg border border-outline-variant px-5 py-2.5 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-variant"
							>
								Cancelar
							</button>
							<button
								type="submit"
								disabled={isPending || uploading || form.imageUrls.length === 0}
								className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary shadow-sm transition-all duration-200 hover:-translate-y-px hover:bg-on-primary-fixed-variant hover:shadow-md disabled:opacity-70"
							>
								{isPending
									? "Salvando…"
									: isEdit
										? "Salvar Alterações"
										: "Cadastrar Imóvel"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
