export interface Lead {
	id: string;
	name: string;
	email: string;
	phone: string;
	message: string;
	propertyId?: string | null;
	propertyName?: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface LeadInput {
	name: string;
	email: string;
	phone: string;
	message: string;
	propertyId?: string;
}

export interface PaginatedLeads {
	data: Lead[];
	meta: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}
