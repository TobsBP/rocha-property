import { API_URL, ApiError, api } from "#/lib/api";
import { getToken } from "#/modules/auth/auth.storage";
import type {
	AdminProperty,
	AdminPropertyListItem,
	CreatePropertyInput,
	Paginated,
	Property,
	PropertyFilters,
} from "./properties.types";

/** Converte o imóvel achatado da API no `Property` aninhado que a UI usa. */
function mapApiToProperty(item: AdminPropertyListItem): Property {
	const price = Number(item.price);
	const condo = item.condoFee ? Number(item.condoFee) : undefined;
	return {
		id: item.id,
		title: item.title ?? item.name ?? "Imóvel",
		description: item.description ?? "",
		price: Number.isFinite(price) ? price : 0,
		condominiumFee: condo && Number.isFinite(condo) ? condo : undefined,
		type: item.type ?? "casa",
		transactionType: item.purpose === "aluguel" ? "aluguel" : "compra",
		status: item.status,
		address: {
			street: item.addressStreet ?? "",
			neighborhood: item.neighborhood ?? "",
			city: item.city ?? "",
			state: item.state ?? "",
		},
		area: item.area ?? 0,
		bedrooms: item.bedrooms ?? 0,
		bathrooms: item.bathrooms ?? 0,
		parkingSpots: item.parkingSpaces ?? 0,
		images: item.imageUrls ?? [],
		badge: item.isExclusive ? "Exclusivo" : item.isNew ? "Novo" : undefined,
		createdAt: item.createdAt ?? "",
		updatedAt: item.updatedAt ?? "",
	};
}

export async function fetchProperties(
	filters?: PropertyFilters,
): Promise<Property[]> {
	const res = await api.get<Paginated<AdminPropertyListItem>>("/properties", {
		params: { page: 1, limit: 20 },
	});
	const items = Array.isArray(res?.data) ? res.data : [];
	let mapped = items.map(mapApiToProperty);

	if (filters?.intent)
		mapped = mapped.filter((p) => p.transactionType === filters.intent);
	if (filters?.type) mapped = mapped.filter((p) => p.type === filters.type);
	if (filters?.bedrooms)
		mapped = mapped.filter((p) => p.bedrooms >= (filters.bedrooms ?? 0));
	if (filters?.minPrice)
		mapped = mapped.filter((p) => p.price >= (filters.minPrice ?? 0));
	if (filters?.maxPrice)
		mapped = mapped.filter((p) => p.price <= (filters.maxPrice ?? Infinity));

	return mapped;
}

export async function fetchProperty(id: string): Promise<Property | null> {
	const item = await api.get<AdminPropertyListItem | null>(`/properties/${id}`);
	return item ? mapApiToProperty(item) : null;
}

export async function fetchSimilarProperties(id: string): Promise<Property[]> {
	// Sem endpoint dedicado: reaproveita a listagem e remove o atual.
	const all = await fetchProperties();
	return all.filter((p) => p.id !== id).slice(0, 3);
}

/**
 * Lista os imóveis para a área administrativa (requer auth).
 * Resposta paginada: `{ data: AdminPropertyListItem[], meta }`.
 */
export async function fetchAdminProperties(): Promise<AdminPropertyListItem[]> {
	const res = await api.get<Paginated<AdminPropertyListItem>>("/properties");
	return Array.isArray(res?.data) ? res.data : [];
}

/**
 * Sobe uma ou mais imagens de imóvel (requer auth).
 * `POST /properties/img` — multipart, responde `{ urls: string[] }`.
 */
export async function uploadPropertyImages(files: File[]): Promise<string[]> {
	const formData = new FormData();
	for (const file of files) formData.append("file", file);

	const token = getToken();
	const response = await fetch(`${API_URL}/properties/img`, {
		method: "POST",
		headers: token ? { Authorization: `Bearer ${token}` } : {},
		body: formData,
	});

	if (!response.ok) {
		const body = await response.json().catch(() => undefined);
		throw new ApiError(response.status, "Falha no upload das imagens.", body);
	}

	const { urls } = (await response.json()) as { urls: string[] };
	return urls;
}

/** Cadastra um novo imóvel (requer auth). */
export async function createProperty(
	input: CreatePropertyInput,
): Promise<AdminProperty> {
	return api.post<AdminProperty>("/properties", input);
}

/** Atualiza um imóvel existente (requer auth). */
export async function updateProperty(
	id: string,
	input: CreatePropertyInput,
): Promise<AdminProperty> {
	return api.patch<AdminProperty>(`/properties/${id}`, input);
}

/** Remove um imóvel (requer auth). */
export async function deleteProperty(id: string): Promise<void> {
	return api.delete("/properties", { body: { id } });
}
