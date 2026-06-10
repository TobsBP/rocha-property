const AGENT_IMAGE =
	"https://lh3.googleusercontent.com/aida-public/AB6AXuC3bza3BJK1sQDk4MZyzJLseNiv7m6Opd8ojjCHHz7IwT4Jktg2rL8H_SrreJJv_lCFbxIxOJJdXEja65fohBfomLHQa_CqugcMPwZoPHGRolzudrVIs-TJ5ek2hl2DTfyDMRu0mm2Jx4Pm2IQuoFQa2Y7qs3XL5TkLwUq8Kz1JqUWQTi80PB7Sy50-UArCtelWRgrTKk-MqramVVYvNlmP8Qn6XgtpPDiND_UvxCN7IPLg8SAVV_8QSjJHdC_hqJFo0Cz3BkF7-tzn";

export function AboutSection() {
	return (
		<section className="bg-surface-container-low rounded-2xl p-6 md:p-10 overflow-hidden relative">
			<div className="absolute top-0 right-0 w-64 h-64 bg-primary-container rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
				<div className="lg:col-span-5 flex flex-col justify-center">
					<h2 className="text-2xl md:text-3xl font-semibold text-on-surface mb-3 tracking-tight">
						Tradição e Inovação no Mercado Imobiliário
					</h2>
					<p className="text-base text-on-surface-variant mb-6 leading-relaxed">
						A Imóveis Rocha combina décadas de experiência com as mais modernas
						ferramentas digitais para garantir negócios seguros, ágeis e
						transparentes. Nosso compromisso é encontrar o espaço perfeito para
						sua história.
					</p>
					<div>
						<button className="bg-primary text-on-primary px-6 py-3 rounded-lg text-sm font-bold hover:bg-on-error-container transition-colors shadow-sm">
							Conheça nossa história
						</button>
					</div>
				</div>

				<div className="lg:col-span-7 grid grid-cols-2 gap-3 md:gap-4 mt-6 lg:mt-0">
					<div className="bg-surface p-4 rounded-xl card-shadow border border-surface-variant flex flex-col items-center justify-center text-center">
						<span className="text-5xl font-bold text-primary">25+</span>
						<span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mt-1">
							Anos no Mercado
						</span>
					</div>
					<div className="col-span-1 row-span-2 rounded-xl overflow-hidden relative min-h-[200px]">
						<img
							src={AGENT_IMAGE}
							alt="Equipe Imóveis Rocha"
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="bg-surface p-4 rounded-xl card-shadow border border-surface-variant flex flex-col items-center justify-center text-center">
						<span className="text-3xl font-black text-on-surface">5.000+</span>
						<span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mt-1">
							Imóveis Negociados
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
