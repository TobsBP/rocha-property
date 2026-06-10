import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchLeads, submitLead } from "./leads.api";
import type { LeadInput } from "./leads.types";

export const leadKeys = {
	all: ["leads"] as const,
};

export function useLeads() {
	return useQuery({
		queryKey: leadKeys.all,
		queryFn: fetchLeads,
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
