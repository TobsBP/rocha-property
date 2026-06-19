import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface LightboxProps {
	images: string[];
	initialIndex: number;
	title: string;
	onClose: () => void;
}

/**
 * Visualizador de imagens em tela cheia, com setas de navegação,
 * atalhos de teclado (← → Esc), contador e tira de miniaturas.
 */
export function Lightbox({
	images,
	initialIndex,
	title,
	onClose,
}: LightboxProps) {
	const [index, setIndex] = useState(initialIndex);

	const prev = useCallback(() => {
		setIndex((i) => (i - 1 + images.length) % images.length);
	}, [images.length]);

	const next = useCallback(() => {
		setIndex((i) => (i + 1) % images.length);
	}, [images.length]);

	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") onClose();
			else if (e.key === "ArrowLeft") prev();
			else if (e.key === "ArrowRight") next();
		}
		window.addEventListener("keydown", onKey);
		document.body.style.overflow = "hidden";
		return () => {
			window.removeEventListener("keydown", onKey);
			document.body.style.overflow = "";
		};
	}, [onClose, prev, next]);

	return (
		<div className="fixed inset-0 z-120 flex flex-col bg-black/90 backdrop-blur-sm">
			{/* Top bar */}
			<div className="flex items-center justify-between px-4 py-3 text-white">
				<span className="text-sm font-medium tabular-nums">
					{index + 1} / {images.length}
				</span>
				<button
					type="button"
					onClick={onClose}
					aria-label="Fechar"
					className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
				>
					<X size={20} />
				</button>
			</div>

			{/* Main image + arrows */}
			<div className="relative flex flex-1 items-center justify-center px-4 pb-2 min-h-0">
				{images.length > 1 && (
					<button
						type="button"
						onClick={prev}
						aria-label="Imagem anterior"
						className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
					>
						<ChevronLeft size={26} />
					</button>
				)}

				<div className="relative h-full w-full max-w-5xl">
					<Image
						key={images[index]}
						src={images[index]}
						alt={`${title} ${index + 1}`}
						fill
						sizes="(max-width: 1024px) 100vw, 1024px"
						priority
						className="object-contain"
					/>
				</div>

				{images.length > 1 && (
					<button
						type="button"
						onClick={next}
						aria-label="Próxima imagem"
						className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
					>
						<ChevronRight size={26} />
					</button>
				)}
			</div>

			{/* Thumbnails */}
			{images.length > 1 && (
				<div className="flex justify-center gap-2 overflow-x-auto px-4 py-4">
					{images.map((src, i) => (
						<button
							type="button"
							key={src}
							onClick={() => setIndex(i)}
							aria-label={`Ver imagem ${i + 1}`}
							className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-all ${
								i === index
									? "border-white"
									: "border-transparent opacity-50 hover:opacity-100"
							}`}
						>
							<Image
								src={src}
								alt={`${title} miniatura ${i + 1}`}
								fill
								sizes="80px"
								className="object-cover"
							/>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
