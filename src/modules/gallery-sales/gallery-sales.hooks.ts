import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createGallerySale,
	deleteGallerySale,
	fetchGallerySale,
	fetchGallerySales,
	updateGallerySale,
} from "./gallery-sales.api";
import type {
	CreateGallerySaleInput,
	UpdateGallerySaleInput,
} from "./gallery-sales.types";

export const gallerySaleKeys = {
	all: ["gallery-sales"] as const,
	list: (page?: number, limit?: number) =>
		[...gallerySaleKeys.all, { page, limit }] as const,
	detail: (id: string) => [...gallerySaleKeys.all, id] as const,
};

export function useGallerySales(page = 1, limit = 10) {
	return useQuery({
		queryKey: gallerySaleKeys.list(page, limit),
		queryFn: () => fetchGallerySales(page, limit),
		staleTime: 1000 * 60 * 5,
	});
}

export function useGallerySale(id: string) {
	return useQuery({
		queryKey: gallerySaleKeys.detail(id),
		queryFn: () => fetchGallerySale(id),
		enabled: Boolean(id),
		staleTime: 1000 * 60 * 5,
	});
}

export function useCreateGallerySale() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (input: CreateGallerySaleInput) => createGallerySale(input),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: gallerySaleKeys.all });
		},
	});
}

export function useUpdateGallerySale(id: string) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (input: UpdateGallerySaleInput) => updateGallerySale(id, input),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: gallerySaleKeys.all });
		},
	});
}

export function useDeleteGallerySale() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => deleteGallerySale(id),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: gallerySaleKeys.all });
		},
	});
}
