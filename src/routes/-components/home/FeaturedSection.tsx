import { ArrowRight } from "lucide-react";
import type { Property } from "#/modules/properties";
import { PropertyCard, PropertyCardSkeleton } from "#/modules/properties";

export function FeaturedSection({
	properties,
	isLoading,
}: {
	properties: Property[];
	isLoading: boolean;
}) {
	return (
		<section>
			<div className="flex justify-between items-end mb-6">
				<div>
					<h2 className="text-2xl md:text-3xl font-semibold text-on-surface tracking-tight">
						Imóveis em Destaque
					</h2>
					<p className="text-sm text-on-surface-variant mt-1">
						As melhores oportunidades selecionadas para você.
					</p>
				</div>
				<a
					href="#"
					className="hidden md:flex items-center gap-1 text-primary text-sm font-bold hover:underline"
				>
					Ver todos <ArrowRight size={16} />
				</a>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{isLoading
					? [1, 2, 3].map((i) => <PropertyCardSkeleton key={i} />)
					: properties.map((p) => <PropertyCard key={p.id} property={p} />)}
			</div>

			<div className="mt-4 text-center md:hidden">
				<button className="w-full border border-outline text-on-surface py-3 rounded-lg text-sm font-bold">
					Ver todos os imóveis
				</button>
			</div>
		</section>
	);
}
