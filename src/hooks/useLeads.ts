import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchLeads, submitLead } from '#/services/leads'
import type { LeadInput } from '#/types/property'

export function useLeads() {
  return useQuery({
    queryKey: ['leads'],
    queryFn: fetchLeads,
    staleTime: 1000 * 60 * 2,
  })
}

export function useSubmitLead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: LeadInput) => submitLead(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['leads'] })
    },
  })
}
