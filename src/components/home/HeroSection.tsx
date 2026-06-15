import { Bed, Home, MapPin, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { PropertyType, TransactionType } from "#/modules/properties";

const HERO_IMAGE =
	"https://lh3.googleusercontent.com/aida-public/AB6AXuD3gvu9x0XxA1t1soVmGXBkpq52qOwfqjAsLslyVU-F_IjnOPCyOrQLb4TYptF44LmU4BKVX8CBxCpfKBPacwtzxvE5I8rNc-DFt942WViamaluVyuESvzkdjr3aCYlTD_JIz8-xEb2mC_BssDljvSIdsL7tQ4xhdMC-LzIwNA2a01kEWqR_yhQ-8tUUP2n3sTd_UrfOOoXrTOqhut-6gkAqNmCSW6OFCZLiDdQNzA6tMAru0YSKviLmz6ul5a1pyu6QPdQA4mxo68z";

const INTENTS: { value: TransactionType; label: string }[] = [
	{ value: "compra", label: "Comprar" },
	{ value: "aluguel", label: "Alugar" },
];

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

	const activeIndex = INTENTS.findIndex((i) => i.value === intent);

	return (
		<header className="hero-grain relative w-full min-h-[88vh] flex items-center justify-center overflow-hidden">
			{/* Backdrop */}
			<div className="absolute inset-0 z-0">
				<Image
					src={HERO_IMAGE}
					alt="Imóvel de luxo"
					className="ken-burns w-full h-full object-cover"
				/>
				<div className="absolute inset-0 hero-gradient" />
			</div>

			<div className="relative z-10 w-full max-w-6xl mx-auto px-5 md:px-10 pt-28 pb-16">
				{/* Kicker */}
				<div
					className="reveal is-revealed flex items-center gap-3 mb-6"
					style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
				>
					<span className="h-px w-10 bg-white/60" />
					<span className="text-[0.7rem] md:text-xs font-semibold uppercase tracking-[0.32em] text-white/85">
						Imóveis Rocha · Curadoria imobiliária
					</span>
				</div>

				{/* Headline */}
				<h1 className="max-w-3xl text-white leading-[1.02] tracking-tight">
					<span
						className="reveal is-revealed block text-5xl md:text-7xl font-medium"
						style={
							{
								fontFamily: "'Fraunces', Georgia, serif",
								"--reveal-delay": "180ms",
							} as React.CSSProperties
						}
					>
						Encontre o lugar
					</span>
					<span
						className="reveal is-revealed block text-5xl md:text-7xl font-medium italic"
						style={
							{
								fontFamily: "'Fraunces', Georgia, serif",
								"--reveal-delay": "320ms",
							} as React.CSSProperties
						}
					>
						onde sua história
					</span>
					<span
						className="reveal is-revealed block text-5xl md:text-7xl font-medium"
						style={
							{
								fontFamily: "'Fraunces', Georgia, serif",
								"--reveal-delay": "460ms",
							} as React.CSSProperties
						}
					>
						vai acontecer.
					</span>
				</h1>

				<p
					className="reveal is-revealed mt-6 max-w-xl text-base md:text-lg text-white/80 leading-relaxed"
					style={{ "--reveal-delay": "600ms" } as React.CSSProperties}
				>
					Compra, venda e aluguel com a segurança de quem conhece cada bairro —
					e a transparência que você merece em cada negócio.
				</p>

				{/* Search panel */}
				<div
					className="reveal is-revealed mt-10 glass-panel rounded-2xl p-4 md:p-5 max-w-4xl shadow-2xl"
					style={{ "--reveal-delay": "740ms" } as React.CSSProperties}
				>
					<div className="segmented mb-4">
						<span
							className="segmented__pill"
							style={{
								width: `calc((100% - 8px) / ${INTENTS.length})`,
								transform: `translateX(calc(${activeIndex} * 100%))`,
							}}
						/>
						{INTENTS.map((opt) => (
							<button
								key={opt.value}
								type="button"
								className="segmented__option"
								data-active={intent === opt.value}
								onClick={() => setIntent(opt.value)}
							>
								{opt.label}
							</button>
						))}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_auto] gap-3">
						<div className="relative">
							<MapPin
								size={18}
								className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant"
							/>
							<input
								type="text"
								placeholder="Cidade ou bairro"
								value={location}
								onChange={(e) => setLocation(e.target.value)}
								className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/25 outline-none transition-all text-sm text-on-surface"
							/>
						</div>
						<div className="relative">
							<Home
								size={18}
								className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
							/>
							<select
								value={type}
								onChange={(e) => setType(e.target.value as PropertyType | "")}
								className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/25 outline-none transition-all text-sm text-on-surface appearance-none"
							>
								<option value="">Tipo</option>
								<option value="casa">Casa</option>
								<option value="apartamento">Apartamento</option>
								<option value="terreno">Terreno</option>
								<option value="cobertura">Cobertura</option>
							</select>
						</div>
						<div className="relative">
							<Bed
								size={18}
								className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
							/>
							<select
								value={bedrooms}
								onChange={(e) => setBedrooms(e.target.value)}
								className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-outline-variant bg-surface focus:border-primary focus:ring-2 focus:ring-primary/25 outline-none transition-all text-sm text-on-surface appearance-none"
							>
								<option value="">Quartos</option>
								<option value="1">1+</option>
								<option value="2">2+</option>
								<option value="3">3+</option>
								<option value="4">4+</option>
							</select>
						</div>
						<button
							type="button"
							className="btn-sheen bg-primary hover:bg-on-primary-fixed-variant text-on-primary text-sm font-bold py-3.5 px-7 rounded-xl shadow-lg transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 whitespace-nowrap"
						>
							<Search size={16} />
							Buscar
						</button>
					</div>
				</div>
			</div>

			{/* Scroll cue */}
			<div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2">
				<div className="h-9 w-[22px] rounded-full border border-white/45 flex justify-center pt-2">
					<span className="scroll-cue-dot h-1.5 w-1.5 rounded-full bg-white/90" />
				</div>
			</div>
		</header>
	);
}
