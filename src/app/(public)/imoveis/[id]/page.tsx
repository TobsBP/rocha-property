"use client";

import {
	ArrowRight,
	Bath,
	Bed,
	Car,
	ChevronRight,
	Heart,
	MapPin,
	Ruler,
	Share2,
	Star,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Footer } from "#/components/Footer";
import { NavBar } from "#/components/NavBar";
import { formatPrice } from "#/lib/utils";
import { LeadForm } from "#/modules/leads";
import {
	FinancingSimulator,
	ImageGallery,
	PropertyMap,
	SimilarCard,
	useProperty,
	useSimilarProperties,
} from "#/modules/properties";

export default function PropertyDetailPage() {
	const params = useParams();
	const id = params.id as string;
	const { data: property, isLoading } = useProperty(id);
	const { data: similar = [] } = useSimilarProperties(id);

	if (isLoading) {
		return (
			<div className="min-h-screen bg-background font-[Inter,ui-sans-serif,system-ui,sans-serif]">
				<NavBar activePage="imoveis" />
				<div className="max-w-7xl mx-auto px-4 md:px-10 py-10">
					<div className="animate-pulse flex flex-col gap-6">
						<div className="h-6 bg-surface-container-high rounded w-48" />
						<div className="h-100 bg-surface-container-high rounded-xl" />
						<div className="grid grid-cols-3 gap-4">
							<div className="col-span-2 h-96 bg-surface-container-high rounded-xl" />
							<div className="h-96 bg-surface-container-high rounded-xl" />
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (!property) {
		return (
			<div className="min-h-screen bg-background font-[Inter,ui-sans-serif,system-ui,sans-serif]">
				<NavBar activePage="imoveis" />
				<div className="max-w-7xl mx-auto px-4 md:px-10 py-20 text-center">
					<h1 className="text-2xl font-semibold text-on-surface mb-2">
						Imóvel não encontrado
					</h1>
					<p className="text-on-surface-variant mb-6">
						O imóvel que você procura não está disponível.
					</p>
					<Link
						href="/"
						className="text-primary font-bold hover:underline no-underline"
					>
						Voltar para o início
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background text-foreground font-[Inter,ui-sans-serif,system-ui,sans-serif] antialiased">
			<NavBar activePage="imoveis" />

			<main className="max-w-7xl mx-auto px-4 md:px-10 py-6 flex flex-col gap-6">
				{/* Breadcrumbs & Quick Actions */}
				<div className="flex justify-between items-center w-full">
					<div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant">
						<Link
							href="/"
							className="hover:text-primary transition-colors no-underline text-on-surface-variant"
						>
							Home
						</Link>
						<ChevronRight size={14} />
						<span className="hover:text-primary transition-colors cursor-pointer">
							{property.address.city}
						</span>
						<ChevronRight size={14} />
						<span className="text-on-surface">
							{property.address.neighborhood}
						</span>
					</div>
					<div className="flex gap-2">
						<button
							type="button"
							className="p-2 rounded-full bg-surface-container-low hover:bg-surface-container-high transition-colors text-on-surface-variant"
						>
							<Share2 size={18} />
						</button>
						<button
							type="button"
							className="p-2 rounded-full bg-surface-container-low hover:bg-surface-container-high transition-colors text-on-surface-variant"
						>
							<Heart size={18} />
						</button>
					</div>
				</div>

				{/* Image Gallery */}
				<ImageGallery images={property.images} title={property.title} />

				{/* Main Content + Sidebar */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
					{/* Left: Details */}
					<div className="lg:col-span-2 flex flex-col gap-8">
						{/* Header */}
						<div className="flex flex-col gap-3">
							<div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full w-fit">
								<Star size={14} />
								<span className="text-xs font-bold uppercase tracking-wider">
									Exclusividade
								</span>
							</div>
							<h1 className="text-4xl md:text-5xl font-bold text-on-surface tracking-tight leading-tight">
								{property.title}
							</h1>
							<div className="flex items-center gap-2 text-on-surface-variant text-base">
								<MapPin size={18} />
								<span>
									{property.address.street}, {property.address.neighborhood} —{" "}
									{property.address.city}, {property.address.state}
								</span>
							</div>
							<div className="mt-1">
								<span className="text-3xl font-semibold text-primary">
									{formatPrice(property.price)}
								</span>
								{property.condominiumFee && (
									<span className="text-sm text-on-surface-variant ml-2">
										Condomínio: {formatPrice(property.condominiumFee)}/mês
									</span>
								)}
							</div>
						</div>

						{/* Metrics Grid */}
						<div className="grid grid-cols-2 md:grid-cols-4 bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant">
							{[
								{
									icon: <Ruler size={28} className="text-secondary" />,
									value: `${property.area} m²`,
									label: "Área Útil",
								},
								{
									icon: <Bed size={28} className="text-secondary" />,
									value: property.bedrooms,
									label: `Quartos`,
								},
								{
									icon: <Bath size={28} className="text-secondary" />,
									value: property.bathrooms,
									label: "Banheiros",
								},
								{
									icon: <Car size={28} className="text-secondary" />,
									value: property.parkingSpots,
									label: "Vagas",
								},
							].map((m, i) => (
								<div
									key={m.label}
									className={`flex flex-col items-center justify-center p-4 text-center ${i > 0 ? "border-l border-surface-variant" : ""}`}
								>
									<div className="mb-2">{m.icon}</div>
									<span className="text-xl font-semibold text-on-surface">
										{m.value}
									</span>
									<span className="text-xs font-semibold text-on-surface-variant mt-1">
										{m.label}
									</span>
								</div>
							))}
						</div>

						{/* Description */}
						<div>
							<h2 className="text-2xl font-semibold text-on-surface mb-4">
								Descrição do Imóvel
							</h2>
							<div className="text-base text-on-surface-variant leading-relaxed space-y-4">
								{property.description.split("\n\n").map((paragraph) => (
									<p key={paragraph}>{paragraph}</p>
								))}
							</div>
						</div>

						{/* Localização */}
						<div>
							<h2 className="text-2xl font-semibold text-on-surface mb-4">
								Localização
							</h2>
							<PropertyMap address={property.address} />
						</div>
					</div>

					{/* Right: Sidebar */}
					<div className="flex flex-col gap-6 lg:sticky lg:top-28 h-fit">
						<LeadForm propertyId={property.id} propertyTitle={property.title} />
						<FinancingSimulator price={property.price} />
					</div>
				</div>

				{/* Similar Properties */}
				{similar.length > 0 && (
					<div className="mt-6 pt-6 border-t border-surface-variant">
						<div className="flex justify-between items-end mb-4">
							<h2 className="text-3xl font-semibold text-on-surface">
								Imóveis Similares
							</h2>
							<button
								type="button"
								className="text-primary hover:text-on-primary-fixed-variant text-sm font-medium flex items-center gap-1 transition-colors bg-transparent border-0 cursor-pointer"
							>
								Ver todos <ArrowRight size={14} />
							</button>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{similar.map((p) => (
								<SimilarCard key={p.id} property={p} />
							))}
						</div>
					</div>
				)}
			</main>

			<Footer />
		</div>
	);
}
