import { API_URL, ApiError, api, isApiConfigured } from "#/lib/api";
import { getToken } from "#/modules/auth/auth.storage";
import { MOCK_GALLERY_SALES } from "./gallery-sales.mocks";
import type {
	CreateGallerySaleInput,
	GallerySale,
	Paginated,
	UpdateGallerySaleInput,
} from "./gallery-sales.types";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function fetchGallerySales(
	page = 1,
	limit = 10,
): Promise<Paginated<GallerySale>> {
	if (isApiConfigured) {
		return api.get<Paginated<GallerySale>>("/gallery-sales", {
			params: { page, limit },
		});
	}

	await delay(300);
	const start = (page - 1) * limit;
	const data = MOCK_GALLERY_SALES.slice(start, start + limit);
	return {
		data,
		meta: {
			total: MOCK_GALLERY_SALES.length,
			page,
			limit,
			totalPages: Math.ceil(MOCK_GALLERY_SALES.length / limit),
		},
	};
}

export async function fetchGallerySale(id: string): Promise<GallerySale> {
	if (isApiConfigured) {
		return api.get<GallerySale>(`/gallery-sales/${id}`);
	}

	await delay(200);
	const found = MOCK_GALLERY_SALES.find((s) => s.id === id);
	if (!found) throw new Error(`GallerySale with id ${id} not found`);
	return found;
}

export async function uploadGallerySaleImages(
	files: File[],
): Promise<string[]> {
	const formData = new FormData();
	for (const file of files) formData.append("file", file);

	const token = getToken();
	const response = await fetch(`${API_URL}/gallery-sales/img`, {
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

export async function createGallerySale(
	input: CreateGallerySaleInput,
): Promise<GallerySale> {
	return api.post<GallerySale>("/gallery-sales", input);
}

export async function updateGallerySale(
	id: string,
	input: UpdateGallerySaleInput,
): Promise<GallerySale> {
	return api.patch<GallerySale>(`/gallery-sales/${id}`, input);
}

export async function deleteGallerySale(id: string): Promise<void> {
	return api.delete<void>("/gallery-sales", { body: { id } });
}
