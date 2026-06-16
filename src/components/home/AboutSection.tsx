import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Reveal } from "#/components/Reveal";
import { useCountUp } from "./useCountUp";

function Stat({
	end,
	suffix,
	label,
	emphasis = false,
}: {
	end: number;
	suffix: string;
	label: string;
	emphasis?: boolean;
}) {
	const { ref, value } = useCountUp(end);
	return (
		<div
			ref={ref as React.Ref<HTMLDivElement>}
			className="bg-surface p-5 rounded-2xl card-shadow border border-surface-variant flex flex-col items-center justify-center text-center"
		>
			<span
				className={
					emphasis
						? "text-5xl font-bold text-primary tabular-nums"
						: "text-3xl font-black text-on-surface tabular-nums"
				}
			>
				{value}
				{suffix}
			</span>
			<span className="text-[0.68rem] font-semibold text-on-surface-variant uppercase tracking-[0.14em] mt-2">
				{label}
			</span>
		</div>
	);
}

export function AboutSection() {
	return (
		<section className="relative overflow-hidden rounded-3xl bg-surface-container-low p-6 md:p-12">
			<div className="absolute top-0 right-0 w-72 h-72 bg-primary-container rounded-full mix-blend-multiply blur-3xl opacity-20 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
				<Reveal as="div" className="lg:col-span-5 flex flex-col justify-center">
					<span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
						Nossa história
					</span>
					<h2
						className="mt-3 text-3xl md:text-[2.5rem] font-medium text-on-surface tracking-tight leading-[1.1]"
						style={{ fontFamily: "'Fraunces', Georgia, serif" }}
					>
						Tradição e inovação no mercado imobiliário
					</h2>
					<p className="mt-5 text-base text-on-surface-variant leading-relaxed">
						A Imóveis Rocha combina anos de experiência com as ferramentas
						digitais mais modernas para garantir negócios seguros, ágeis e
						transparentes. Nosso compromisso é encontrar o espaço perfeito para
						a sua história.
					</p>
					<div className="mt-7">
						<button
							type="button"
							className="btn-sheen inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3.5 rounded-xl text-sm font-bold hover:-translate-y-0.5 transition-all shadow-md"
						>
							Conheça nossa história
							<ArrowUpRight size={16} />
						</button>
					</div>
				</Reveal>

				<Reveal
					as="div"
					delay={140}
					className="lg:col-span-7 grid grid-cols-2 gap-3 md:gap-4"
				>
					<Stat end={7} suffix="+" label="Anos no mercado" emphasis />
					<div className="col-span-1 row-span-2 rounded-2xl overflow-hidden relative min-h-55 group">
						<Image
							src="/about.jpeg"
							alt="Equipe Imóveis Rocha"
							fill
							sizes="(max-width: 768px) 100vw, 400px"
							className="object-cover transition-transform duration-700 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
					</div>
					<Stat end={60} suffix="+" label="Imóveis negociados" />
				</Reveal>
			</div>
		</section>
	);
}
