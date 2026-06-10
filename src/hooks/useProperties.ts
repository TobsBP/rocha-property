import { useQuery } from '@tanstack/react-query'
import {
  fetchProperties,
  fetchProperty,
  fetchSimilarProperties,
  fetchAdminProperties,
} from '#/services/properties'
import type { PropertyFilters } from '#/types/property'

export function useProperties(filters?: PropertyFilters) {
  return useQuery({
    queryKey: ['properties', filters ?? {}],
    queryFn: () => fetchProperties(filters),
    staleTime: 1000 * 60 * 5,
  })
}

export function useProperty(id: string) {
  return useQuery({
    queryKey: ['properties', id],
    queryFn: () => fetchProperty(id),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  })
}

export function useSimilarProperties(id: string) {
  return useQuery({
    queryKey: ['properties', 'similar', id],
    queryFn: () => fetchSimilarProperties(id),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  })
}

export function useAdminProperties() {
  return useQuery({
    queryKey: ['properties', 'admin'],
    queryFn: fetchAdminProperties,
    staleTime: 1000 * 60 * 5,
  })
}
