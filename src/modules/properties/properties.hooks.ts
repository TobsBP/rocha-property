import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createProperty,
	fetchAdminProperties,
	fetchProperties,
	fetchProperty,
	fetchSimilarProperties,
} from "./properties.api";
import type { CreatePropertyInput, PropertyFilters } from "./properties.types";

export const propertyKeys = {
	all: ["properties"] as const,
	list: (filters?: PropertyFilters) =>
		[...propertyKeys.all, filters ?? {}] as const,
	detail: (id: string) => [...propertyKeys.all, id] as const,
	similar: (id: string) => [...propertyKeys.all, "similar", id] as const,
	admin: () => [...propertyKeys.all, "admin"] as const,
};

export function useProperties(filters?: PropertyFilters) {
	return useQuery({
		queryKey: propertyKeys.list(filters),
		queryFn: () => fetchProperties(filters),
		staleTime: 1000 * 60 * 5,
	});
}

export function useProperty(id: string) {
	return useQuery({
		queryKey: propertyKeys.detail(id),
		queryFn: () => fetchProperty(id),
		enabled: Boolean(id),
		staleTime: 1000 * 60 * 5,
	});
}

export function useSimilarProperties(id: string) {
	return useQuery({
		queryKey: propertyKeys.similar(id),
		queryFn: () => fetchSimilarProperties(id),
		enabled: Boolean(id),
		staleTime: 1000 * 60 * 5,
	});
}

export function useAdminProperties() {
	return useQuery({
		queryKey: propertyKeys.admin(),
		queryFn: fetchAdminProperties,
		staleTime: 1000 * 60 * 5,
	});
}

export function useCreateProperty() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (input: CreatePropertyInput) => createProperty(input),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: propertyKeys.admin() });
		},
	});
}
