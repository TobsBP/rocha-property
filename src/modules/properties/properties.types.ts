export type PropertyStatus = "active" | "pending" | "sold" | "draft";

export type PropertyType =
	| "casa"
	| "apartamento"
	| "terreno"
	| "cobertura"
	| "loft"
	| "comercial";

export type TransactionType = "compra" | "aluguel";

export interface Property {
	id: string;
	title: string;
	description: string;
	price: number;
	condominiumFee?: number;
	type: PropertyType;
	transactionType: TransactionType;
	status: PropertyStatus;
	address: {
		street: string;
		neighborhood: string;
		city: string;
		state: string;
	};
	area: number;
	bedrooms: number;
	bathrooms: number;
	parkingSpots: number;
	images: string[];
	badge?: "Exclusivo" | "Novo" | "Redução de Preço";
	createdAt: string;
	updatedAt: string;
}

export interface PropertyFilters {
	intent?: TransactionType;
	location?: string;
	type?: PropertyType;
	bedrooms?: number;
	minPrice?: number;
	maxPrice?: number;
}

/** Finalidade do imóvel no formato da API (difere de `TransactionType`). */
export type PropertyPurpose = "venda" | "aluguel";

/**
 * Formato achatado de imóvel usado pela API administrativa
 * (`GET`/`POST /properties`). Difere do `Property` aninhado do site público.
 */
export interface AdminProperty {
	id: string;
	title: string;
	description: string;
	price: string;
	condoFee: string;
	type: PropertyType;
	purpose: PropertyPurpose;
	status: PropertyStatus;
	area: number;
	bedrooms: number;
	suites: number;
	bathrooms: number;
	parkingSpaces: number;
	isExclusive: boolean;
	isNew: boolean;
	addressStreet: string;
	neighborhood: string;
	city: string;
	state: string;
	/** URLs das imagens; a primeira é a capa. */
	imageUrls: string[];
	createdAt?: string;
	updatedAt?: string;
}

/** Corpo do `POST /properties` para cadastrar um imóvel. */
export type CreatePropertyInput = Omit<
	AdminProperty,
	"id" | "createdAt" | "updatedAt"
>;

/**
 * Item devolvido por `GET /properties`. A API pode responder numa projeção
 * enxuta (`name`/`location`) ou no formato achatado completo — por isso a
 * maioria dos campos é opcional.
 */
export interface AdminPropertyListItem {
	id: string;
	status: PropertyStatus;
	price: string;
	/** Projeção enxuta. */
	name?: string;
	location?: string;
	/** Formato achatado completo. */
	title?: string;
	description?: string;
	condoFee?: string;
	type?: PropertyType;
	purpose?: PropertyPurpose;
	area?: number;
	bedrooms?: number;
	suites?: number;
	bathrooms?: number;
	parkingSpaces?: number;
	isExclusive?: boolean;
	isNew?: boolean;
	addressStreet?: string;
	neighborhood?: string;
	city?: string;
	state?: string;
	/** URLs das imagens; a primeira é a capa. */
	imageUrls?: string[];
	createdAt?: string;
	updatedAt?: string;
}

export interface PaginationMeta {
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

/** Envelope paginado padrão da API. */
export interface Paginated<T> {
	data: T[];
	meta: PaginationMeta;
}
