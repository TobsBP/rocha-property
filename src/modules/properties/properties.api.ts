import { api, isApiConfigured } from "#/lib/api";
import { MOCK_PROPERTIES } from "./properties.mocks";
import type {
	AdminProperty,
	AdminPropertyListItem,
	CreatePropertyInput,
	Paginated,
	Property,
	PropertyFilters,
} from "./properties.types";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

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
		images: item.imageUrl ? [item.imageUrl] : [],
		badge: item.isExclusive ? "Exclusivo" : item.isNew ? "Novo" : undefined,
		createdAt: item.createdAt ?? "",
		updatedAt: item.updatedAt ?? "",
	};
}

export async function fetchProperties(
	filters?: PropertyFilters,
): Promise<Property[]> {
	if (isApiConfigured) {
		const res = await api.get<Paginated<AdminPropertyListItem>>("/properties", {
			params: { page: 1, limit: 20 },
		});
		const items = Array.isArray(res?.data) ? res.data : [];
		let mapped = items.map(mapApiToProperty);
		if (filters?.intent)
			mapped = mapped.filter((p) => p.transactionType === filters.intent);
		if (filters?.type) mapped = mapped.filter((p) => p.type === filters.type);
		return mapped;
	}

	// Fallback mock — sem backend configurado.
	await delay(300);
	let result = [...MOCK_PROPERTIES];
	if (filters?.intent)
		result = result.filter((p) => p.transactionType === filters.intent);
	if (filters?.type) result = result.filter((p) => p.type === filters.type);
	if (filters?.bedrooms)
		result = result.filter((p) => p.bedrooms >= (filters.bedrooms ?? 0));
	if (filters?.minPrice)
		result = result.filter((p) => p.price >= (filters.minPrice ?? 0));
	if (filters?.maxPrice)
		result = result.filter((p) => p.price <= (filters.maxPrice ?? Infinity));
	return result.slice(0, 3);
}

export async function fetchProperty(id: string): Promise<Property | null> {
	if (isApiConfigured) {
		const item = await api.get<AdminPropertyListItem | null>(
			`/properties/${id}`,
		);
		return item ? mapApiToProperty(item) : null;
	}

	await delay(200);
	return MOCK_PROPERTIES.find((p) => p.id === id) ?? null;
}

export async function fetchSimilarProperties(id: string): Promise<Property[]> {
	if (isApiConfigured) {
		// Sem endpoint dedicado: reaproveita a listagem e remove o atual.
		const all = await fetchProperties();
		return all.filter((p) => p.id !== id).slice(0, 3);
	}

	await delay(300);
	return MOCK_PROPERTIES.filter((p) => p.id !== id).slice(0, 3);
}

/**
 * Lista os imóveis para a área administrativa (requer auth).
 * Resposta paginada: `{ data: AdminPropertyListItem[], meta }`.
 */
export async function fetchAdminProperties(): Promise<AdminPropertyListItem[]> {
	const res = await api.get<Paginated<AdminPropertyListItem>>("/properties");
	return Array.isArray(res?.data) ? res.data : [];
}

/** Cadastra um novo imóvel (requer auth). */
export async function createProperty(
	input: CreatePropertyInput,
): Promise<AdminProperty> {
	return api.post<AdminProperty>("/properties", input);
}
