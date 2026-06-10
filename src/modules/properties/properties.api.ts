import { api, isApiConfigured } from "#/lib/api";
import { ADMIN_PROPERTIES, MOCK_PROPERTIES } from "./properties.mocks";
import type { Property, PropertyFilters } from "./properties.types";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function fetchProperties(
	filters?: PropertyFilters,
): Promise<Property[]> {
	if (isApiConfigured) {
		return api.get<Property[]>("/properties", {
			params: {
				intent: filters?.intent,
				type: filters?.type,
				location: filters?.location,
				bedrooms: filters?.bedrooms,
				minPrice: filters?.minPrice,
				maxPrice: filters?.maxPrice,
			},
		});
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
		return api.get<Property | null>(`/properties/${id}`);
	}

	await delay(200);
	return MOCK_PROPERTIES.find((p) => p.id === id) ?? null;
}

export async function fetchSimilarProperties(id: string): Promise<Property[]> {
	if (isApiConfigured) {
		return api.get<Property[]>(`/properties/${id}/similar`);
	}

	await delay(300);
	return MOCK_PROPERTIES.filter((p) => p.id !== id).slice(0, 3);
}

export async function fetchAdminProperties(): Promise<Property[]> {
	if (isApiConfigured) {
		return api.get<Property[]>("/admin/properties");
	}

	await delay(300);
	return ADMIN_PROPERTIES;
}
