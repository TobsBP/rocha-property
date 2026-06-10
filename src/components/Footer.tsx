import { Camera, Mail, MapPin, Phone, Share2 } from "lucide-react";

export function Footer() {
	return (
		<footer className="bg-surface-container-highest w-full py-10 border-t border-surface-variant mt-10">
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 md:px-10 max-w-[1280px] mx-auto">
				<div className="md:col-span-2">
					<div className="text-xl font-black text-on-surface tracking-tight mb-2">
						Imóveis Rocha
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
							<a
								key={item}
								href="#"
								className="text-sm text-on-secondary-container hover:text-primary transition-colors no-underline"
							>
								{item}
							</a>
						))}
					</div>
				</div>

				<div>
					<h4 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-3">
						Contato
					</h4>
					<div className="flex flex-col gap-2 text-sm text-on-secondary-container">
						<span className="flex items-center gap-2">
							<Phone size={14} /> (11) 3000-0000
						</span>
						<span className="flex items-center gap-2">
							<Mail size={14} /> contato@imoveisrocha.com
						</span>
						<span className="flex items-center gap-2">
							<MapPin size={14} /> Av. Faria Lima, 1000 - SP
						</span>
						<div className="flex gap-3 mt-2">
							<a
								href="#"
								className="p-2 bg-surface-container-low rounded-full hover:bg-primary hover:text-on-primary transition-colors text-on-surface-variant"
							>
								<Share2 size={16} />
							</a>
							<a
								href="#"
								className="p-2 bg-surface-container-low rounded-full hover:bg-primary hover:text-on-primary transition-colors text-on-surface-variant"
							>
								<Camera size={16} />
							</a>
						</div>
					</div>
				</div>
			</div>

			<div className="px-4 md:px-10 max-w-[1280px] mx-auto mt-6 pt-4 border-t border-outline-variant text-xs text-on-secondary-container">
				© 2024 Imóveis Rocha. Todos os direitos reservados.
			</div>
		</footer>
	);
}
