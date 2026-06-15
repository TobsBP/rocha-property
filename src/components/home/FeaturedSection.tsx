import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "#/components/Reveal";
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
			<Reveal className="flex justify-between items-end mb-8">
				<div>
					<span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
						Seleção da casa
					</span>
					<h2
						className="mt-2 text-3xl md:text-[2.6rem] font-medium text-on-surface tracking-tight leading-tight"
						style={{ fontFamily: "'Fraunces', Georgia, serif" }}
					>
						Imóveis em destaque
					</h2>
					<div className="accent-rule is-revealed mt-4" />
					<p className="text-sm text-on-surface-variant mt-4 max-w-md">
						As melhores oportunidades selecionadas a dedo para você.
					</p>
				</div>
				<Link
					href="/imoveis"
					className="group hidden md:inline-flex items-center gap-1.5 text-primary text-sm font-bold no-underline"
				>
					Ver todos
					<ArrowRight
						size={16}
						className="transition-transform duration-300 group-hover:translate-x-1"
					/>
				</Link>
			</Reveal>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{isLoading
					? [1, 2, 3].map((i) => <PropertyCardSkeleton key={i} />)
					: properties.map((p, i) => (
							<Reveal key={p.id} delay={i * 110} y={32}>
								<PropertyCard property={p} />
							</Reveal>
						))}
			</div>

			<div className="mt-8 text-center md:hidden">
				<Link
					href="/imoveis"
					className="inline-flex w-full items-center justify-center border border-outline text-on-surface py-3 rounded-xl text-sm font-bold no-underline hover:bg-surface-container-low transition-colors"
				>
					Ver todos os imóveis
				</Link>
			</div>
		</section>
	);
}
