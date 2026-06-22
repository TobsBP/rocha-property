import { Check, Copy, Instagram, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

interface ShareModalProps {
	url: string;
	title: string;
	onClose: () => void;
}

/**
 * Modal de compartilhamento com opções de WhatsApp, copiar link e Instagram.
 * O Instagram não permite compartilhar links arbitrários via web, então a opção
 * copia o link e abre o app/site para o usuário colar em story ou direct.
 */
export function ShareModal({ url, title, onClose }: ShareModalProps) {
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") onClose();
		}
		window.addEventListener("keydown", onKey);
		document.body.style.overflow = "hidden";
		return () => {
			window.removeEventListener("keydown", onKey);
			document.body.style.overflow = "";
		};
	}, [onClose]);

	const copyLink = async () => {
		try {
			await navigator.clipboard.writeText(url);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// ignora falha de clipboard (ex.: contexto não seguro)
		}
	};

	const shareWhatsApp = () => {
		const text = `${title}\n${url}`;
		window.open(
			`https://wa.me/?text=${encodeURIComponent(text)}`,
			"_blank",
			"noopener,noreferrer",
		);
	};

	const shareInstagram = async () => {
		await copyLink();
		window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
	};

	return (
		<div className="fixed inset-0 z-120 flex items-center justify-center p-4">
			<button
				type="button"
				aria-label="Fechar"
				onClick={onClose}
				className="absolute inset-0 bg-black/60 backdrop-blur-sm"
			/>
			<div
				className="relative w-full max-w-sm rounded-2xl bg-surface p-6 shadow-xl"
				role="dialog"
				aria-modal="true"
				aria-label="Compartilhar imóvel"
			>
				<div className="mb-5 flex items-center justify-between">
					<h2 className="text-lg font-semibold text-on-surface">
						Compartilhar
					</h2>
					<button
						type="button"
						onClick={onClose}
						aria-label="Fechar"
						className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high"
					>
						<X size={20} />
					</button>
				</div>

				<div className="flex flex-col gap-2">
					<button
						type="button"
						onClick={shareWhatsApp}
						className="flex items-center gap-3 rounded-xl bg-surface-container-low p-3 text-left transition-colors hover:bg-surface-container-high"
					>
						<span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white">
							<MessageCircle size={20} />
						</span>
						<span className="font-medium text-on-surface">WhatsApp</span>
					</button>

					<button
						type="button"
						onClick={shareInstagram}
						className="flex items-center gap-3 rounded-xl bg-surface-container-low p-3 text-left transition-colors hover:bg-surface-container-high"
					>
						<span className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white">
							<Instagram size={20} />
						</span>
						<span className="flex flex-col">
							<span className="font-medium text-on-surface">Instagram</span>
							<span className="text-xs text-on-surface-variant">
								Copia o link para colar no story ou direct
							</span>
						</span>
					</button>

					<button
						type="button"
						onClick={copyLink}
						className="flex items-center gap-3 rounded-xl bg-surface-container-low p-3 text-left transition-colors hover:bg-surface-container-high"
					>
						<span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-highest text-on-surface">
							{copied ? <Check size={20} /> : <Copy size={20} />}
						</span>
						<span className="font-medium text-on-surface">
							{copied ? "Link copiado!" : "Copiar link"}
						</span>
					</button>
				</div>
			</div>
		</div>
	);
}
