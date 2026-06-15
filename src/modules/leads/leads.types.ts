export type LeadType = "viewing" | "question" | "seller";
export type LeadIntent = "high" | "medium" | "low";

export interface Lead {
	id: string;
	name: string;
	email: string;
	phone: string;
	message: string;
	propertyId?: string;
	propertyTitle?: string;
	type: LeadType;
	intent: LeadIntent;
	createdAt: string;
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
