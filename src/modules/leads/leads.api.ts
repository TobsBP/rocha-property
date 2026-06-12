import { api, isApiConfigured } from "#/lib/api";
import { MOCK_LEADS } from "./leads.mocks";
import type { Lead, LeadInput } from "./leads.types";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function fetchLeads(): Promise<Lead[]> {
	if (isApiConfigured) {
		const data = await api.get<Lead[]>("/leads");
		if (Array.isArray(data)) return data;
	}

	await delay(300);
	return [...MOCK_LEADS];
}

export async function submitLead(input: LeadInput): Promise<Lead> {
	if (isApiConfigured) {
		return api.post<Lead>("/leads", input);
	}

	await delay(500);
	const lead: Lead = {
		id: `l${Date.now()}`,
		...input,
		type: "question",
		intent: "medium",
		createdAt: new Date().toISOString(),
	};
	return lead;
}
