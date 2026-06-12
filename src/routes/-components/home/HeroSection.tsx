import { Bed, Home, MapPin, Search } from "lucide-react";
import { useState } from "react";
import type { PropertyType, TransactionType } from "#/modules/properties";

const HERO_IMAGE =
	"https://lh3.googleusercontent.com/aida-public/AB6AXuD3gvu9x0XxA1t1soVmGXBkpq52qOwfqjAsLslyVU-F_IjnOPCyOrQLb4TYptF44LmU4BKVX8CBxCpfKBPacwtzxvE5I8rNc-DFt942WViamaluVyuESvzkdjr3aCYlTD_JIz8-xEb2mC_BssDljvSIdsL7tQ4xhdMC-LzIwNA2a01kEWqR_yhQ-8tUUP2n3sTd_UrfOOoXrTOqhut-6gkAqNmCSW6OFCZLiDdQNzA6tMAru0YSKviLmz6ul5a1pyu6QPdQA4mxo68z";

export function HeroSection({
	intent,
	setIntent,
}: {
	intent: TransactionType;
	setIntent: (v: TransactionType) => void;
}) {
	const [location, setLocation] = useState("");
	const [type, setType] = useState<PropertyType | "">("");
	const [bedrooms, setBedrooms] = useState("");

	return (
		<header className="relative w-full h-150 md:h-204.75 min-h-125 flex items-center justify-center overflow-hidden">
			<div className="absolute inset-0 z-0">
				<img
					src={HERO_IMAGE}
					alt="Imóvel de luxo"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 hero-gradient" />
			</div>

			<div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-10 text-center mt-[-5vh]">
				<h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg tracking-tight leading-tight">
					Encontre o imóvel ideal
					<br className="hidden md:block" /> para sua família
				</h1>
				<p className="text-lg md:text-2xl font-semibold text-surface-container-low max-w-3xl mx-auto mb-8 drop-shadow-md">
					Compra, venda e aluguel de imóveis com segurança e confiança.
				</p>

				<div className="glass-panel rounded-xl p-4 md:p-6 max-w-4xl mx-auto shadow-2xl text-left">
					<div className="flex gap-4 border-b border-outline-variant pb-3 mb-4">
						{(["compra", "aluguel"] as TransactionType[]).map((v) => (
							<label key={v} className="flex items-center gap-2 cursor-pointer">
								<input
									type="radio"
									name="intent"
									value={v}
									checked={intent === v}
									onChange={() => setIntent(v)}
									className="accent-primary"
								/>
								<span
									className={`text-sm font-semibold text-on-surface ${intent === v ? "font-bold" : ""}`}
								>
									{v === "compra" ? "Comprar" : "Alugar"}
								</span>
							</label>
						))}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						<div className="col-span-1 md:col-span-2 relative">
							<MapPin
								size={18}
								className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
							/>
							<input
								type="text"
								placeholder="Cidade ou Bairro"
								value={location}
								onChange={(e) => setLocation(e.target.value)}
								className="w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-on-surface"
							/>
						</div>
						<div className="col-span-1 relative">
							<Home
								size={18}
								className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
							/>
							<select
								value={type}
								onChange={(e) => setType(e.target.value as PropertyType | "")}
								className="w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-on-surface appearance-none"
							>
								<option value="">Tipo de Imóvel</option>
								<option value="casa">Casa</option>
								<option value="apartamento">Apartamento</option>
								<option value="terreno">Terreno</option>
								<option value="cobertura">Cobertura</option>
							</select>
						</div>
						<div className="col-span-1 relative">
							<Bed
								size={18}
								className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
							/>
							<select
								value={bedrooms}
								onChange={(e) => setBedrooms(e.target.value)}
								className="w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-on-surface appearance-none"
							>
								<option value="">Quartos</option>
								<option value="1">1+</option>
								<option value="2">2+</option>
								<option value="3">3+</option>
								<option value="4">4+</option>
							</select>
						</div>
					</div>

					<div className="flex justify-end mt-4">
						<button
							type="button"
							className="bg-primary hover:bg-on-primary-fixed-variant text-on-primary text-sm font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 flex items-center gap-2"
						>
							<Search size={16} />
							Buscar Imóveis
						</button>
					</div>
				</div>
			</div>
		</header>
	);
}
