import { CalendarDays, ImageOff } from "lucide-react";
import Image from "next/image";
import { useGallerySales } from "../gallery-sales.hooks";

function formatDate(iso: string) {
	return new Date(iso).toLocaleDateString("pt-BR", {
		month: "long",
		year: "numeric",
	});
}

function CardSkeleton() {
	return (
		<div className="bg-surface rounded-xl border border-surface-variant overflow-hidden animate-pulse">
			<div className="aspect-video bg-surface-container-high" />
			<div className="p-5 flex flex-col gap-3">
				<div className="h-3 w-28 bg-surface-container-high rounded" />
				<div className="h-4 w-full bg-surface-container-high rounded" />
				<div className="h-4 w-3/4 bg-surface-container-high rounded" />
			</div>
		</div>
	);
}

export function GallerySalesTab() {
	const { data, isLoading, isError } = useGallerySales(1, 12);

	if (isLoading) {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{Array.from({ length: 6 }).map((_, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
					<CardSkeleton key={i} />
				))}
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex flex-col items-center justify-center py-20 gap-3 text-on-surface-variant">
				<ImageOff size={40} className="text-outline" />
				<p className="text-sm font-medium">
					Não foi possível carregar a galeria.
				</p>
			</div>
		);
	}

	const sales = data?.data ?? [];

	if (sales.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-20 gap-3 text-on-surface-variant">
				<ImageOff size={40} className="text-outline" />
				<p className="text-sm font-medium">Nenhum imóvel na galeria ainda.</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-8">
			<div className="text-center max-w-2xl mx-auto">
				<span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
					Negócios realizados
				</span>
				<h2 className="text-3xl md:text-4xl font-semibold text-on-surface tracking-tight mt-2">
					Imóveis que encontraram novos donos
				</h2>
				<p className="text-sm text-on-surface-variant mt-2">
					{data?.meta.total ?? 0} imóvel
					{(data?.meta.total ?? 0) !== 1 ? "is" : ""} negociado
					{(data?.meta.total ?? 0) !== 1 ? "s" : ""} com sucesso
				</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{sales.map((sale) => (
					<article
						key={sale.id}
						className="bg-surface rounded-xl border border-surface-variant card-shadow overflow-hidden group hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
					>
						<div className="aspect-video overflow-hidden bg-surface-container-high">
							<Image
								src={sale.imgUrls[0]}
								alt={sale.description}
								className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
							/>
						</div>
						<div className="p-5 flex flex-col gap-2">
							<div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
								<CalendarDays size={13} />
								<span>Vendido em {formatDate(sale.soldAt)}</span>
							</div>
							<p className="text-sm text-on-surface leading-relaxed line-clamp-3">
								{sale.description}
							</p>
						</div>
					</article>
				))}
			</div>
		</div>
	);
}
