"use client";

import { FilterX, Home, MapPin, Search } from "lucide-react";
import { useState } from "react";
import { Footer } from "#/components/Footer";
import { NavBar } from "#/components/NavBar";
import {
	PropertyCard,
	PropertyCardSkeleton,
	type PropertyType,
	type TransactionType,
	useProperties,
} from "#/modules/properties";

export default function ImoveisPage() {
	const [intent, setIntent] = useState<TransactionType | "">("");
	const [type, setType] = useState<PropertyType | "">("");
	const [location, setLocation] = useState("");

	const { data: properties = [], isLoading } = useProperties({
		intent: intent || undefined,
		type: type || undefined,
		location: location || undefined,
	});

	const clearFilters = () => {
		setIntent("");
		setType("");
		setLocation("");
	};

	return (
		<div className="min-h-screen bg-background text-foreground font-[Inter,ui-sans-serif,system-ui,sans-serif] antialiased">
			<NavBar activePage="imoveis" />

			<main className="w-full max-w-7xl mx-auto px-4 md:px-10 py-10">
				<header className="mb-10">
					<h1 className="text-3xl md:text-4xl font-bold text-on-surface tracking-tight">
						Nossos Imóveis
					</h1>
					<p className="text-on-surface-variant mt-2">
						Explore nossa seleção completa de casas, apartamentos e terrenos.
					</p>
				</header>

				{/* Filtros */}
				<section className="bg-surface-container-low rounded-2xl p-6 mb-10 border border-surface-variant shadow-sm">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
						<div className="flex flex-col gap-1.5">
							<label
								htmlFor="intent"
								className="text-xs font-bold text-on-surface-variant uppercase tracking-wider"
							>
								Finalidade
							</label>
							<select
								id="intent"
								value={intent}
								onChange={(e) =>
									setIntent(e.target.value as TransactionType | "")
								}
								className="w-full h-11 px-3 rounded-lg border border-outline-variant bg-surface text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
							>
								<option value="">Todas</option>
								<option value="compra">Comprar</option>
								<option value="aluguel">Alugar</option>
							</select>
						</div>

						<div className="flex flex-col gap-1.5">
							<label
								htmlFor="type"
								className="text-xs font-bold text-on-surface-variant uppercase tracking-wider"
							>
								Tipo de Imóvel
							</label>
							<div className="relative">
								<Home
									size={16}
									className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
								/>
								<select
									id="type"
									value={type}
									onChange={(e) => setType(e.target.value as PropertyType | "")}
									className="w-full h-11 pl-10 pr-3 rounded-lg border border-outline-variant bg-surface text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
								>
									<option value="">Todos os tipos</option>
									<option value="casa">Casa</option>
									<option value="apartamento">Apartamento</option>
									<option value="terreno">Terreno</option>
									<option value="cobertura">Cobertura</option>
									<option value="loft">Loft</option>
									<option value="comercial">Comercial</option>
									<option value="sitio">Sítio</option>
									<option value="chacara">Chácara</option>
									<option value="fazenda">Fazenda</option>
								</select>
							</div>
						</div>

						<div className="flex flex-col gap-1.5">
							<label
								htmlFor="location"
								className="text-xs font-bold text-on-surface-variant uppercase tracking-wider"
							>
								Localização
							</label>
							<div className="relative">
								<MapPin
									size={16}
									className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
								/>
								<input
									id="location"
									type="text"
									placeholder="Cidade ou bairro"
									value={location}
									onChange={(e) => setLocation(e.target.value)}
									className="w-full h-11 pl-10 pr-3 rounded-lg border border-outline-variant bg-surface text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
								/>
							</div>
						</div>

						<div className="flex gap-2">
							<button
								type="button"
								onClick={clearFilters}
								className="flex-1 md:flex-none h-11 px-4 rounded-lg border border-outline text-on-surface-variant hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 text-sm font-medium"
							>
								<FilterX size={16} />
								Limpar
							</button>
						</div>
					</div>
				</section>

				{/* Lista */}
				{isLoading ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[1, 2, 3, 4, 5, 6].map((i) => (
							<PropertyCardSkeleton key={i} />
						))}
					</div>
				) : properties.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{properties.map((p) => (
							<PropertyCard key={p.id} property={p} />
						))}
					</div>
				) : (
					<div className="text-center py-20 bg-surface-container-lowest rounded-2xl border border-dashed border-outline-variant">
						<Search size={48} className="mx-auto text-outline-variant mb-4" />
						<h3 className="text-lg font-semibold text-on-surface">
							Nenhum imóvel encontrado
						</h3>
						<p className="text-sm text-on-surface-variant mt-1">
							Tente ajustar seus filtros para encontrar o que procura.
						</p>
						<button
							type="button"
							onClick={clearFilters}
							className="mt-6 text-primary font-bold hover:underline"
						>
							Ver todos os imóveis
						</button>
					</div>
				)}
			</main>

			<Footer />
		</div>
	);
}
