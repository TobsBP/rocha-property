"use client";

import {
	ArrowRight,
	Award,
	Building2,
	GalleryHorizontal,
	Handshake,
	Heart,
	Info,
	MapPin,
	ShieldCheck,
	Sparkles,
	Target,
	Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Footer } from "#/components/Footer";
import { NavBar } from "#/components/NavBar";
import { GallerySalesTab } from "#/modules/gallery-sales";

type Tab = "about" | "gallery";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
	{ id: "about", label: "Sobre nós", icon: <Info size={16} /> },
	{
		id: "gallery",
		label: "Galeria de vendas",
		icon: <GalleryHorizontal size={16} />,
	},
];

const STATS = [
	{ value: "7+", label: "Anos no mercado" },
	{ value: "50", label: "Imóveis negociados" },
	{ value: "98%", label: "Clientes satisfeitos" },
	{ value: "40", label: "Corretores especialistas" },
];

const VALUES = [
	{
		icon: <ShieldCheck size={24} />,
		title: "Segurança jurídica",
		description:
			"Cada negociação passa por análise documental rigorosa, garantindo tranquilidade do início ao fim.",
	},
	{
		icon: <Handshake size={24} />,
		title: "Transparência",
		description:
			"Comunicação clara e honesta em todas as etapas — sem letras miúdas, sem surpresas.",
	},
	{
		icon: <Target size={24} />,
		title: "Foco no cliente",
		description:
			"Entendemos seu momento e suas prioridades para encontrar o imóvel certo, não apenas mais um.",
	},
	{
		icon: <Sparkles size={24} />,
		title: "Inovação",
		description:
			"Tecnologia e dados a serviço de decisões melhores, com agilidade que o mercado exige.",
	},
];

export default function AboutPage() {
	const [activeTab, setActiveTab] = useState<Tab>("about");

	return (
		<div className="min-h-screen bg-background text-foreground font-[Inter,ui-sans-serif,system-ui,sans-serif] antialiased">
			<NavBar activePage="about" />

			{/* Hero */}
			<header className="relative w-full h-96 md:h-112 flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0 z-0">
					<Image
						src={"/img-1.jpeg"}
						alt="Sede da Imóveis Rocha"
						fill
						priority
						sizes="100vw"
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 hero-gradient" />
				</div>
				<div className="relative z-10 w-full max-w-4xl mx-auto px-4 md:px-10 text-center">
					<span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-[0.16em] px-3 py-1.5 rounded-full mb-4">
						<Building2 size={14} /> Quem somos
					</span>
					<h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg tracking-tight leading-tight">
						Conectando pessoas aos
						<br className="hidden md:block" /> imóveis certos desde 1999
					</h1>
					<p className="text-lg md:text-xl font-medium text-surface-container-low max-w-2xl mx-auto drop-shadow-md">
						Mais que uma imobiliária — um parceiro de confiança em cada
						conquista.
					</p>
				</div>
			</header>

			{/* Tab bar */}
			<div className="sticky top-20 z-40 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30">
				<div className="w-full max-w-7xl mx-auto px-4 md:px-10">
					<div className="flex gap-1 pt-2">
						{TABS.map((tab) => (
							<button
								key={tab.id}
								type="button"
								onClick={() => setActiveTab(tab.id)}
								className={[
									"inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-t-lg transition-all",
									activeTab === tab.id
										? "text-primary border-b-2 border-primary bg-primary-fixed/20"
										: "text-on-surface-variant hover:text-primary hover:bg-surface-container-low",
								].join(" ")}
							>
								{tab.icon}
								{tab.label}
							</button>
						))}
					</div>
				</div>
			</div>

			<main className="w-full max-w-7xl mx-auto px-4 md:px-10 py-14 md:py-20 flex flex-col gap-20">
				{activeTab === "gallery" && <GallerySalesTab />}
				{activeTab === "about" && (
					<>
						{/* Nossa história */}
						<section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
							<div className="relative">
								<div className="rounded-2xl overflow-hidden card-shadow border border-surface-variant aspect-4/3">
									<Image
										src={"/img-2.jpeg"}
										fill
										sizes="(max-width: 1024px) 100vw, 50vw"
										alt="Equipe Imóveis Rocha"
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="absolute -bottom-6 -right-4 md:-right-6 bg-primary text-on-primary rounded-xl px-6 py-4 shadow-[0_8px_24px_rgba(162,5,19,0.35)]">
									<span className="block text-3xl font-black leading-none">
										25+
									</span>
									<span className="text-xs font-semibold uppercase tracking-wider">
										Anos de história
									</span>
								</div>
							</div>
							<div className="flex flex-col gap-4">
								<span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
									Nossa história
								</span>
								<h2 className="text-3xl md:text-4xl font-semibold text-on-surface tracking-tight">
									Tradição construída sobre confiança
								</h2>
								<p className="text-base text-on-surface-variant leading-relaxed">
									A Imóveis Rocha nasceu de um propósito simples: tornar a
									compra, venda e locação de imóveis uma experiência segura e
									humana. Ao longo de mais de duas décadas, ajudamos milhares de
									famílias e investidores a encontrarem o lugar certo.
								</p>
								<p className="text-base text-on-surface-variant leading-relaxed">
									Combinamos o conhecimento profundo do mercado local com
									ferramentas digitais modernas, oferecendo agilidade sem abrir
									mão do cuidado pessoal que sempre nos definiu.
								</p>
								<Link
									href="/"
									className="inline-flex items-center gap-2 text-primary text-sm font-bold no-underline hover:gap-3 transition-all w-fit"
								>
									Ver imóveis disponíveis <ArrowRight size={16} />
								</Link>
							</div>
						</section>

						{/* Stats */}
						<section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
							{STATS.map((stat) => (
								<div
									key={stat.label}
									className="bg-surface rounded-xl border border-surface-variant card-shadow p-6 flex flex-col items-center text-center"
								>
									<span className="text-4xl md:text-5xl font-bold text-primary leading-none">
										{stat.value}
									</span>
									<span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mt-2">
										{stat.label}
									</span>
								</div>
							))}
						</section>

						{/* Valores */}
						<section className="flex flex-col gap-8">
							<div className="text-center max-w-2xl mx-auto">
								<span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
									No que acreditamos
								</span>
								<h2 className="text-3xl md:text-4xl font-semibold text-on-surface tracking-tight mt-2">
									Os valores que guiam cada negócio
								</h2>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
								{VALUES.map((value) => (
									<div
										key={value.title}
										className="bg-surface rounded-xl border border-surface-variant card-shadow p-6 flex flex-col gap-3 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
									>
										<div className="w-12 h-12 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
											{value.icon}
										</div>
										<h3 className="text-lg font-semibold text-on-surface">
											{value.title}
										</h3>
										<p className="text-sm text-on-surface-variant leading-relaxed">
											{value.description}
										</p>
									</div>
								))}
							</div>
						</section>

						{/* Missão / Visão */}
						<section className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="bg-surface-container-low rounded-2xl p-8 relative overflow-hidden">
								<div className="absolute top-0 right-0 w-48 h-48 bg-primary-container rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
								<div className="relative z-10 flex flex-col gap-3">
									<div className="w-12 h-12 rounded-lg bg-primary text-on-primary flex items-center justify-center">
										<Target size={24} />
									</div>
									<h3 className="text-2xl font-semibold text-on-surface">
										Nossa missão
									</h3>
									<p className="text-base text-on-surface-variant leading-relaxed">
										Realizar o sonho do imóvel ideal com segurança,
										transparência e um atendimento que coloca as pessoas em
										primeiro lugar.
									</p>
								</div>
							</div>
							<div className="bg-surface-container-low rounded-2xl p-8 relative overflow-hidden">
								<div className="absolute top-0 right-0 w-48 h-48 bg-primary-container rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
								<div className="relative z-10 flex flex-col gap-3">
									<div className="w-12 h-12 rounded-lg bg-primary text-on-primary flex items-center justify-center">
										<Heart size={24} />
									</div>
									<h3 className="text-2xl font-semibold text-on-surface">
										Nossa visão
									</h3>
									<p className="text-base text-on-surface-variant leading-relaxed">
										Ser a imobiliária de referência da região, reconhecida pela
										excelência, pela inovação e pela confiança de quem nos
										escolhe.
									</p>
								</div>
							</div>
						</section>

						{/* CTA */}
						<section className="relative overflow-hidden rounded-2xl bg-primary text-on-primary px-8 py-12 md:px-14 md:py-16 text-center">
							<div className="absolute inset-0 opacity-10 pointer-events-none">
								<Award size={320} className="absolute -right-10 -top-10" />
							</div>
							<div className="relative z-10 flex flex-col items-center gap-5">
								<h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-2xl">
									Pronto para encontrar seu próximo imóvel?
								</h2>
								<p className="text-base md:text-lg text-on-primary/90 max-w-xl">
									Nossa equipe está pronta para ajudar você em cada passo da
									jornada.
								</p>
								<div className="flex flex-wrap items-center justify-center gap-3 mt-2">
									<Link
										href="/"
										className="inline-flex items-center gap-2 bg-on-primary text-primary px-6 py-3 rounded-lg text-sm font-bold no-underline hover:-translate-y-0.5 transition-transform shadow-sm"
									>
										<Building2 size={18} /> Ver imóveis
									</Link>
									<span className="inline-flex items-center gap-2 text-sm font-medium text-on-primary/90">
										<MapPin size={16} /> Ouro Fino - MG
									</span>
								</div>
							</div>
						</section>

						{/* Faixa de credibilidade */}
						<section className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 text-on-surface-variant">
							<span className="flex items-center gap-2 text-sm font-semibold">
								<Users size={18} className="text-primary" /> Atendimento humano
							</span>
							<span className="flex items-center gap-2 text-sm font-semibold">
								<ShieldCheck size={18} className="text-primary" /> Negócios
								seguros
							</span>
							<span className="flex items-center gap-2 text-sm font-semibold">
								<Award size={18} className="text-primary" /> Reconhecida no
								mercado
							</span>
						</section>
					</>
				)}
			</main>

			<Footer />
		</div>
	);
}
