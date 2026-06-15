import { Handshake, KeyRound, ShieldCheck } from "lucide-react";
import { Reveal } from "#/components/Reveal";

const ITEMS = [
	{
		icon: ShieldCheck,
		title: "Negócios seguros",
		text: "Documentação verificada e acompanhamento jurídico em cada etapa da transação.",
	},
	{
		icon: KeyRound,
		title: "Curadoria real",
		text: "Cada imóvel é visitado e selecionado pessoalmente antes de chegar até você.",
	},
	{
		icon: Handshake,
		title: "Atendimento próximo",
		text: "Do primeiro contato à entrega das chaves, você fala sempre com quem entende.",
	},
];

export function DifferentialsSection() {
	return (
		<section className="relative">
			<Reveal className="text-center max-w-2xl mx-auto mb-12">
				<span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
					Por que a Rocha
				</span>
				<h2
					className="mt-2 text-3xl md:text-[2.6rem] font-medium text-on-surface tracking-tight leading-tight"
					style={{ fontFamily: "'Fraunces', Georgia, serif" }}
				>
					Mais que imóveis, confiança.
				</h2>
			</Reveal>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
				{ITEMS.map((item, i) => (
					<Reveal key={item.title} delay={i * 120} y={30}>
						<div className="group h-full rounded-2xl border border-surface-variant bg-surface p-7 card-shadow transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40">
							<div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
								<item.icon size={22} />
							</div>
							<h3 className="mt-5 text-lg font-bold text-on-surface">
								{item.title}
							</h3>
							<p className="mt-2 text-sm text-on-surface-variant leading-relaxed">
								{item.text}
							</p>
						</div>
					</Reveal>
				))}
			</div>
		</section>
	);
}
