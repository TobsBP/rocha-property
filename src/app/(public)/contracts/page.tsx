"use client";

import Image from "next/image";
import {
	ArrowRight,
	CheckCircle2,
	ClipboardList,
	FilePen,
	FileText,
	Handshake,
	MessageCircle,
	RefreshCw,
	Scale,
	ScrollText,
	ShieldCheck,
	Stamp,
	Zap,
} from "lucide-react";
import { Footer } from "#/components/Footer";
import { NavBar } from "#/components/NavBar";
import { Reveal } from "#/components/Reveal";

const HERO_IMAGE =
	"https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1600&q=80";

const WHY_TRUST = [
	{
		icon: <FileText size={24} />,
		title: "Elaboração personalizada",
		description:
			"Cada contrato é redigido sob medida para as condições do negócio, sem cláusulas genéricas que geram dúvidas.",
	},
	{
		icon: <ShieldCheck size={24} />,
		title: "Revisão jurídica",
		description:
			"Especialistas analisam cada cláusula para garantir que seus interesses estejam protegidos em todos os cenários.",
	},
	{
		icon: <CheckCircle2 size={24} />,
		title: "Conformidade legal",
		description:
			"Documentos alinhados ao Código Civil, Lei do Inquilinato e demais normas do mercado imobiliário brasileiro.",
	},
	{
		icon: <Zap size={24} />,
		title: "Assinatura digital",
		description:
			"Assine de qualquer lugar com validade jurídica, sem burocracia nem deslocamento desnecessário.",
	},
];

const CONTRACT_TYPES = [
	{
		icon: <Scale size={22} />,
		title: "Compra e Venda",
		description:
			"Transferência segura de propriedade entre comprador e vendedor.",
	},
	{
		icon: <ScrollText size={22} />,
		title: "Locação Residencial",
		description:
			"Proteção completa para locador e locatário em imóveis residenciais.",
	},
	{
		icon: <ClipboardList size={22} />,
		title: "Locação Comercial",
		description:
			"Cláusulas específicas para ponto comercial, fundo de comércio e renovatória.",
	},
	{
		icon: <FilePen size={22} />,
		title: "Promessa de Compra e Venda",
		description:
			"Reserva de imóvel com segurança jurídica antes da escritura definitiva.",
	},
	{
		icon: <RefreshCw size={22} />,
		title: "Distrato Imobiliário",
		description:
			"Rescisão contratual clara, com cálculo de penalidades e devolução de valores.",
	},
	{
		icon: <Handshake size={22} />,
		title: "Permuta",
		description:
			"Troca de imóveis com ou sem complementação em dinheiro, totalmente documentada.",
	},
];

const STEPS = [
	{
		number: "01",
		title: "Consulta inicial",
		description:
			"Conversa gratuita para entender o negócio, as partes e o objetivo do contrato.",
	},
	{
		number: "02",
		title: "Análise documental",
		description:
			"Verificação de documentos de propriedade, CPF/CNPJ, certidões e matrícula do imóvel.",
	},
	{
		number: "03",
		title: "Elaboração do contrato",
		description:
			"Redação personalizada com todas as cláusulas necessárias para o tipo de negócio.",
	},
	{
		number: "04",
		title: "Revisão e ajustes",
		description:
			"Apresentação às partes, alinhamento de cláusulas e eventuais correções antes da assinatura.",
	},
	{
		number: "05",
		title: "Assinatura e registro",
		description:
			"Coleta de assinaturas digitais ou físicas e, quando necessário, registro em cartório.",
	},
];

const SERIF = { fontFamily: "'Fraunces', Georgia, serif" } as const;

function SectionHeading({
	kicker,
	title,
	children,
}: {
	kicker: string;
	title: string;
	children?: React.ReactNode;
}) {
	return (
		<Reveal className="text-center max-w-2xl mx-auto">
			<span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
				{kicker}
			</span>
			<h2
				className="mt-2 text-3xl md:text-[2.6rem] font-medium text-on-surface tracking-tight leading-tight"
				style={SERIF}
			>
				{title}
			</h2>
			<div className="accent-rule is-revealed mx-auto mt-4" />
			{children}
		</Reveal>
	);
}

export default function ContratosPage() {
	return (
		<div className="min-h-screen bg-background text-foreground font-[Inter,ui-sans-serif,system-ui,sans-serif] antialiased">
			<NavBar activePage="contracts" transparent />

			{/* Hero */}
			<header className="hero-grain relative w-full min-h-[78vh] flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0 z-0">
					<Image
						src={HERO_IMAGE}
						alt="Contratos imobiliários"
						className="ken-burns w-full h-full object-cover"
					/>
					<div className="absolute inset-0 hero-gradient" />
				</div>
				<div className="relative z-10 w-full max-w-4xl mx-auto px-5 md:px-10 text-center pt-24">
					<span
						className="reveal is-revealed inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-[0.22em] px-4 py-1.5 rounded-full mb-6"
						style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
					>
						<Stamp size={14} /> Contratos imobiliários
					</span>
					<h1 className="text-white leading-[1.05] tracking-tight">
						<span
							className="reveal is-revealed block text-4xl md:text-7xl font-medium"
							style={
								{ ...SERIF, "--reveal-delay": "200ms" } as React.CSSProperties
							}
						>
							Contratos seguros
						</span>
						<span
							className="reveal is-revealed block text-4xl md:text-7xl font-medium italic"
							style={
								{ ...SERIF, "--reveal-delay": "340ms" } as React.CSSProperties
							}
						>
							do início ao fim
						</span>
					</h1>
					<p
						className="reveal is-revealed text-lg md:text-xl font-medium text-white/85 max-w-2xl mx-auto mt-6 drop-shadow-md"
						style={{ "--reveal-delay": "480ms" } as React.CSSProperties}
					>
						Da elaboração ao registro, cuidamos de cada detalhe jurídico para
						que você feche negócio com total tranquilidade.
					</p>
				</div>

				<div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 hidden md:flex">
					<div className="h-9 w-5.5 rounded-full border border-white/45 flex justify-center pt-2">
						<span className="scroll-cue-dot h-1.5 w-1.5 rounded-full bg-white/90" />
					</div>
				</div>
			</header>

			<main className="w-full max-w-7xl mx-auto px-4 md:px-10 py-16 md:py-28 flex flex-col gap-24 md:gap-32">
				{/* Por que confiar */}
				<section className="flex flex-col gap-10">
					<SectionHeading
						kicker="Por que escolher a Imóveis Rocha"
						title="Segurança jurídica em cada negócio"
					>
						<p className="text-base text-on-surface-variant mt-4 leading-relaxed">
							Contratos mal redigidos são a principal causa de conflitos
							imobiliários. Nossa equipe elimina esse risco antes que ele
							aconteça.
						</p>
					</SectionHeading>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{WHY_TRUST.map((item, i) => (
							<Reveal key={item.title} delay={i * 100} y={30}>
								<div className="group h-full bg-surface rounded-2xl border border-surface-variant card-shadow p-6 flex flex-col gap-3 hover:border-primary/40 hover:-translate-y-1.5 transition-all duration-300">
									<div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
										{item.icon}
									</div>
									<h3 className="text-lg font-bold text-on-surface mt-1">
										{item.title}
									</h3>
									<p className="text-sm text-on-surface-variant leading-relaxed">
										{item.description}
									</p>
								</div>
							</Reveal>
						))}
					</div>
				</section>

				{/* Tipos de contrato */}
				<section className="flex flex-col gap-10">
					<SectionHeading
						kicker="Modalidades"
						title="Contratos que elaboramos"
					/>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
						{CONTRACT_TYPES.map((ct, i) => (
							<Reveal key={ct.title} delay={(i % 3) * 90} y={28}>
								<div className="group h-full bg-surface rounded-2xl border border-surface-variant card-shadow p-6 flex flex-row gap-4 items-start hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
									<div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
										{ct.icon}
									</div>
									<div className="flex flex-col gap-1">
										<h3 className="text-base font-bold text-on-surface leading-tight">
											{ct.title}
										</h3>
										<p className="text-sm text-on-surface-variant leading-relaxed">
											{ct.description}
										</p>
									</div>
								</div>
							</Reveal>
						))}
					</div>
				</section>

				{/* Como funciona */}
				<section className="flex flex-col gap-12">
					<SectionHeading
						kicker="Nosso processo"
						title="Do zero ao contrato assinado"
					/>

					<div className="relative max-w-3xl mx-auto w-full">
						{STEPS.map((step, i) => (
							<Reveal
								key={step.number}
								delay={i * 90}
								className="relative flex gap-6 md:gap-8"
							>
								<div className="flex flex-col items-center">
									<div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm shrink-0 z-10 shadow-lg shadow-primary/20">
										{step.number}
									</div>
									{i < STEPS.length - 1 && (
										<div className="w-0.5 flex-1 my-1 min-h-10 bg-linear-to-b from-primary/50 to-outline-variant" />
									)}
								</div>
								<div className={i === STEPS.length - 1 ? "pb-0" : "pb-10"}>
									<h3 className="text-lg font-bold text-on-surface leading-tight">
										{step.title}
									</h3>
									<p className="text-sm text-on-surface-variant mt-1.5 leading-relaxed max-w-xl">
										{step.description}
									</p>
								</div>
							</Reveal>
						))}
					</div>
				</section>

				{/* CTA */}
				<Reveal as="section" y={36}>
					<div className="relative overflow-hidden rounded-3xl bg-primary text-on-primary px-8 py-14 md:px-14 md:py-20 text-center">
						<div className="absolute inset-0 opacity-10 pointer-events-none">
							<ScrollText
								size={360}
								className="absolute -right-12 -top-12 float-soft"
							/>
						</div>
						<div className="relative z-10 flex flex-col items-center gap-5">
							<h2
								className="text-3xl md:text-5xl font-medium tracking-tight max-w-2xl leading-tight"
								style={SERIF}
							>
								Precisa de um contrato? Fale com a gente.
							</h2>
							<p className="text-base md:text-lg text-on-primary/90 max-w-xl">
								Nossa equipe está pronta para atender você hoje. Consulta
								inicial gratuita, sem compromisso.
							</p>
							<div className="flex flex-wrap items-center justify-center gap-3 mt-2">
								<button
									type="button"
									className="btn-sheen inline-flex items-center gap-2 bg-on-primary text-primary px-7 py-3.5 rounded-full text-sm font-bold hover:-translate-y-0.5 transition-transform shadow-lg"
								>
									<MessageCircle size={18} /> Chamar no WhatsApp
								</button>
								<button
									type="button"
									className="inline-flex items-center gap-2 border border-on-primary/40 text-on-primary px-7 py-3.5 rounded-full text-sm font-bold hover:bg-on-primary/10 transition-colors"
								>
									Ver imóveis disponíveis <ArrowRight size={16} />
								</button>
							</div>
						</div>
					</div>
				</Reveal>

				{/* Trust strip */}
				<Reveal
					as="section"
					className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12 text-on-surface-variant"
				>
					<span className="flex items-center gap-2 text-sm font-semibold">
						<Zap size={18} className="text-primary" /> 100% digital
					</span>
					<span className="flex items-center gap-2 text-sm font-semibold">
						<ShieldCheck size={18} className="text-primary" /> Segurança
						jurídica
					</span>
					<span className="flex items-center gap-2 text-sm font-semibold">
						<CheckCircle2 size={18} className="text-primary" /> Atendimento
						rápido
					</span>
				</Reveal>
			</main>

			<Footer />
		</div>
	);
}
