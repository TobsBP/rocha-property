import { Camera, Mail, Phone, Share2 } from "lucide-react";

export function Footer() {
	return (
		<footer className="bg-surface-container-highest w-full py-10 border-t border-surface-variant mt-10">
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 md:px-10 max-w-7xl mx-auto">
				<div className="md:col-span-2">
					<div
						style={{ fontFamily: "'Monsieur La Doulaise', cursive" }}
						className="text-5xl text-primary font-normal mb-4"
					>
						Fabiana Rocha
					</div>
					<p className="text-sm text-on-secondary-container max-w-sm leading-relaxed">
						Especialistas em conectar pessoas aos melhores imóveis, garantindo
						negócios seguros e rentáveis.
					</p>
				</div>

				<div>
					<h4 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-3">
						Links Rápidos
					</h4>
					<div className="flex flex-col gap-2">
						{["Privacidade", "Termos", "Contato", "FAQ"].map((item) => (
							<button
								key={item}
								type="button"
								className="text-left text-sm text-on-secondary-container hover:text-primary transition-colors bg-transparent border-0 p-0 cursor-pointer"
							>
								{item}
							</button>
						))}
					</div>
				</div>

				<div>
					<h4 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-3">
						Contato
					</h4>
					<div className="flex flex-col gap-2 text-sm text-on-secondary-container">
						<span className="flex items-center gap-2">
							<Phone size={14} /> (35) 99836-3750
						</span>
						<span className="flex items-center gap-2">
							<Mail size={14} /> contato@imoveisrocha.com
						</span>
						<div className="flex gap-3 mt-2">
							<button
								type="button"
								className="p-2 bg-surface-container-low rounded-full hover:bg-primary hover:text-on-primary transition-colors text-on-surface-variant border-0 cursor-pointer"
							>
								<Share2 size={16} />
							</button>
							<button
								type="button"
								className="p-2 bg-surface-container-low rounded-full hover:bg-primary hover:text-on-primary transition-colors text-on-surface-variant border-0 cursor-pointer"
							>
								<Camera size={16} />
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="px-4 md:px-10 max-w-7xl mx-auto mt-6 pt-4 border-t border-outline-variant text-xs text-on-secondary-container">
				© 2024 Imóveis Rocha. Todos os direitos reservados.
			</div>
		</footer>
	);
}
