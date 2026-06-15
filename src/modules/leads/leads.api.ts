import { api } from "#/lib/api";
import type { Lead, LeadInput, PaginatedLeads } from "./leads.types";

export async function fetchLeads(
	page = 1,
	limit = 10,
): Promise<PaginatedLeads> {
	const data = await api.get<PaginatedLeads>("/leads", {
		params: { page, limit },
	});
	return data;
}

export async function fetchLead(id: string): Promise<Lead | null> {
	return api.get<Lead>(`/leads/${id}`);
}

export async function submitLead(input: LeadInput): Promise<Lead> {
	return api.post<Lead>("/leads", input);
}

export async function deleteLead(id: string): Promise<void> {
	return api.delete(`/leads/${id}`);
}
