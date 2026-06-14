export interface GallerySale {
	id: string;
	soldAt: string;
	description: string;
	imgUrls: string[];
	createdAt: string;
	updatedAt: string;
}

export interface CreateGallerySaleInput {
	soldAt: string;
	description: string;
	imgUrls: string[];
}

export type UpdateGallerySaleInput = Partial<CreateGallerySaleInput>;

export interface PaginationMeta {
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

export interface Paginated<T> {
	data: T[];
	meta: PaginationMeta;
}
