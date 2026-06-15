import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteLead, fetchLead, fetchLeads, submitLead } from "./leads.api";
import type { LeadInput } from "./leads.types";

export const leadKeys = {
	all: ["leads"] as const,
	list: (page: number, limit: number) =>
		[...leadKeys.all, { page, limit }] as const,
	detail: (id: string) => [...leadKeys.all, id] as const,
};

export function useLeads(page = 1, limit = 10) {
	return useQuery({
		queryKey: leadKeys.list(page, limit),
		queryFn: () => fetchLeads(page, limit),
		staleTime: 1000 * 60 * 2,
	});
}

export function useLead(id: string) {
	return useQuery({
		queryKey: leadKeys.detail(id),
		queryFn: () => fetchLead(id),
		enabled: Boolean(id),
		staleTime: 1000 * 60 * 2,
	});
}

export function useSubmitLead() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (input: LeadInput) => submitLead(input),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: leadKeys.all });
		},
	});
}

export function useDeleteLead() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => deleteLead(id),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: leadKeys.all });
		},
	});
}
