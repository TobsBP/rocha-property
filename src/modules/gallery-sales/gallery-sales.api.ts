import { API_URL, ApiError, api } from "#/lib/api";
import { getToken } from "#/modules/auth/auth.storage";
import type {
	CreateGallerySaleInput,
	GallerySale,
	Paginated,
	UpdateGallerySaleInput,
} from "./gallery-sales.types";

export async function fetchGallerySales(
	page = 1,
	limit = 10,
): Promise<Paginated<GallerySale>> {
	return api.get<Paginated<GallerySale>>("/gallery-sales", {
		params: { page, limit },
	});
}

export async function fetchGallerySale(id: string): Promise<GallerySale> {
	return api.get<GallerySale>(`/gallery-sales/${id}`);
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
