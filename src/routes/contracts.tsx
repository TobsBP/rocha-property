import { createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute("/contracts")({
	component: ContratosPage,
});

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

function ContratosPage() {
	return (
		<div className="min-h-screen bg-[#f9f9f9] text-on-background font-[Inter,ui-sans-serif,system-ui,sans-serif] antialiased">
			<NavBar activePage="contracts" />

			{/* Hero */}
			<header className="relative w-full h-96 md:h-[28rem] flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0 z-0">
					<img
						src={HERO_IMAGE}
						alt="Contratos imobiliários"
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 hero-gradient" />
				</div>
				<div className="relative z-10 w-full max-w-4xl mx-auto px-4 md:px-10 text-center">
					<span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-[0.16em] px-3 py-1.5 rounded-full mb-4">
						<Stamp size={14} /> Contratos imobiliários
					</span>
					<h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg tracking-tight leading-tight">
						Contratos seguros
						<br className="hidden md:block" /> do início ao fim
					</h1>
					<p className="text-lg md:text-xl font-medium text-surface-container-low max-w-2xl mx-auto drop-shadow-md">
						Da elaboração ao registro, cuidamos de cada detalhe jurídico para
						que você feche negócio com total tranquilidade.
					</p>
				</div>
			</header>

			<main className="w-full max-w-7xl mx-auto px-4 md:px-10 py-14 md:py-20 flex flex-col gap-20">
				{/* Por que confiar */}
				<section className="flex flex-col gap-8">
					<div className="text-center max-w-2xl mx-auto">
						<span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
							Por que escolher a Imóveis Rocha
						</span>
						<h2 className="text-3xl md:text-4xl font-semibold text-on-surface tracking-tight mt-2">
							Segurança jurídica em cada negócio
						</h2>
						<p className="text-base text-on-surface-variant mt-3 leading-relaxed">
							Contratos mal redigidos são a principal causa de conflitos
							imobiliários. Nossa equipe elimina esse risco antes que ele
							aconteça.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{WHY_TRUST.map((item) => (
							<div
								key={item.title}
								className="bg-surface rounded-xl border border-surface-variant card-shadow p-6 flex flex-col gap-3 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
							>
								<div className="w-12 h-12 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
									{item.icon}
								</div>
								<h3 className="text-lg font-semibold text-on-surface">
									{item.title}
								</h3>
								<p className="text-sm text-on-surface-variant leading-relaxed">
									{item.description}
								</p>
							</div>
						))}
					</div>
				</section>

				{/* Tipos de contrato */}
				<section className="flex flex-col gap-8">
					<div className="text-center max-w-2xl mx-auto">
						<span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
							Modalidades
						</span>
						<h2 className="text-3xl md:text-4xl font-semibold text-on-surface tracking-tight mt-2">
							Contratos que elaboramos
						</h2>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
						{CONTRACT_TYPES.map((ct) => (
							<div
								key={ct.title}
								className="bg-surface rounded-xl border border-surface-variant card-shadow p-6 flex flex-row gap-4 items-start hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300 group"
							>
								<div className="w-11 h-11 rounded-lg bg-primary-fixed text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
									{ct.icon}
								</div>
								<div className="flex flex-col gap-1">
									<h3 className="text-base font-semibold text-on-surface leading-tight">
										{ct.title}
									</h3>
									<p className="text-sm text-on-surface-variant leading-relaxed">
										{ct.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Como funciona */}
				<section className="flex flex-col gap-10">
					<div className="text-center max-w-2xl mx-auto">
						<span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
							Nosso processo
						</span>
						<h2 className="text-3xl md:text-4xl font-semibold text-on-surface tracking-tight mt-2">
							Do zero ao contrato assinado
						</h2>
					</div>

					<div className="relative flex flex-col gap-0">
						{STEPS.map((step, i) => (
							<div key={step.number} className="relative flex gap-6 md:gap-8">
								{/* Line + circle */}
								<div className="flex flex-col items-center">
									<div className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm shrink-0 z-10">
										{step.number}
									</div>
									{i < STEPS.length - 1 && (
										<div className="w-0.5 flex-1 bg-outline-variant my-1 min-h-[2.5rem]" />
									)}
								</div>
								{/* Content */}
								<div className={`pb-8 ${i === STEPS.length - 1 ? "pb-0" : ""}`}>
									<h3 className="text-lg font-semibold text-on-surface leading-tight">
										{step.title}
									</h3>
									<p className="text-sm text-on-surface-variant mt-1 leading-relaxed max-w-xl">
										{step.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* CTA */}
				<section className="relative overflow-hidden rounded-2xl bg-primary text-on-primary px-8 py-12 md:px-14 md:py-16 text-center">
					<div className="absolute inset-0 opacity-10 pointer-events-none">
						<ScrollText size={320} className="absolute -right-10 -top-10" />
					</div>
					<div className="relative z-10 flex flex-col items-center gap-5">
						<h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-2xl">
							Precisa de um contrato?
							<br />
							Fale com a gente.
						</h2>
						<p className="text-base md:text-lg text-on-primary/90 max-w-xl">
							Nossa equipe está pronta para atender você hoje. Consulta inicial
							gratuita, sem compromisso.
						</p>
						<div className="flex flex-wrap items-center justify-center gap-3 mt-2">
							<button
								type="button"
								className="inline-flex items-center gap-2 bg-on-primary text-primary px-6 py-3 rounded-lg text-sm font-bold hover:-translate-y-0.5 transition-transform shadow-sm"
							>
								<MessageCircle size={18} /> Chamar no WhatsApp
							</button>
							<button
								type="button"
								className="inline-flex items-center gap-2 border border-on-primary/40 text-on-primary px-6 py-3 rounded-lg text-sm font-bold hover:bg-on-primary/10 transition-colors"
							>
								Ver imóveis disponíveis <ArrowRight size={16} />
							</button>
						</div>
					</div>
				</section>

				{/* Trust strip */}
				<section className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 text-on-surface-variant">
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
				</section>
			</main>

			<Footer />
		</div>
	);
}
