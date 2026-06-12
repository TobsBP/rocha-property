import { X } from "lucide-react";
import { useState } from "react";
import { useCreateProperty } from "../properties.hooks";
import type {
	CreatePropertyInput,
	PropertyPurpose,
	PropertyStatus,
	PropertyType,
} from "../properties.types";

const TYPE_OPTIONS: { value: PropertyType; label: string }[] = [
	{ value: "casa", label: "Casa" },
	{ value: "apartamento", label: "Apartamento" },
	{ value: "terreno", label: "Terreno" },
	{ value: "cobertura", label: "Cobertura" },
	{ value: "loft", label: "Loft" },
	{ value: "comercial", label: "Comercial" },
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
	imageUrl: "",
	brokerId: "",
};

const inputClass =
	"w-full rounded-lg border border-outline-variant bg-surface-bright px-3 py-2.5 text-sm text-on-surface outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary";
const labelClass = "mb-1 block text-xs font-semibold text-on-surface-variant";

export function PropertyFormModal({ onClose }: { onClose: () => void }) {
	const [form, setForm] = useState<CreatePropertyInput>(EMPTY);
	const { mutate, isPending, error } = useCreateProperty();

	function set<K extends keyof CreatePropertyInput>(
		key: K,
		value: CreatePropertyInput[K],
	) {
		setForm((prev) => ({ ...prev, [key]: value }));
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		mutate(form, { onSuccess: onClose });
	}

	return (
		<div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-sm">
			<button
				type="button"
				aria-label="Fechar"
				onClick={onClose}
				className="absolute inset-0 cursor-default"
			/>
			<div className="relative my-8 w-full max-w-2xl rounded-2xl border border-surface-variant bg-surface-container-lowest shadow-[0_12px_48px_rgba(0,0,0,0.18)]">
				<header className="sticky top-0 flex items-center justify-between rounded-t-2xl border-b border-surface-variant bg-surface-container-lowest px-6 py-4">
					<div>
						<h2 className="text-lg font-semibold text-on-surface">
							Novo Imóvel
						</h2>
						<p className="text-sm text-on-surface-variant">
							Preencha os dados para cadastrar.
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

				<form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6">
					{error && (
						<div className="rounded-lg bg-error-container px-4 py-3 text-sm font-medium text-on-error-container">
							{error instanceof Error
								? error.message
								: "Não foi possível cadastrar o imóvel."}
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

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div>
							<label htmlFor="imageUrl" className={labelClass}>
								URL da imagem
							</label>
							<input
								id="imageUrl"
								type="url"
								value={form.imageUrl}
								onChange={(e) => set("imageUrl", e.target.value)}
								placeholder="https://..."
								className={inputClass}
							/>
						</div>
						<div>
							<label htmlFor="brokerId" className={labelClass}>
								Corretor (ID)
							</label>
							<input
								id="brokerId"
								value={form.brokerId}
								onChange={(e) => set("brokerId", e.target.value)}
								className={inputClass}
							/>
						</div>
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
							disabled={isPending}
							className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:bg-on-primary-fixed-variant hover:shadow-md disabled:opacity-70"
						>
							{isPending ? "Salvando…" : "Cadastrar Imóvel"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
