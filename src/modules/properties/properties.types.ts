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
