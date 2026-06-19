import { Expand, Images } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Lightbox } from "./Lightbox";

export function ImageGallery({
	images,
	title,
}: {
	images: string[];
	title: string;
}) {
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
	const shown = images.slice(0, 5);

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-90 md:h-153.5 rounded-xl overflow-hidden">
				<button
					type="button"
					className="md:col-span-2 md:row-span-2 relative group cursor-pointer overflow-hidden p-0 border-0 bg-transparent"
					onClick={() => setLightboxIndex(0)}
				>
					<Image
						src={shown[0]}
						alt={title}
						fill
						priority
						sizes="(min-width: 768px) 50vw, 100vw"
						className="object-cover transition-transform duration-500 group-hover:scale-105"
					/>
					<span className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 text-sm font-medium text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
						<Expand size={16} /> Ampliar
					</span>
				</button>
				{shown.slice(1, 5).map((src, i) => (
					<button
						type="button"
						key={src}
						className="hidden md:block relative group cursor-pointer overflow-hidden p-0 border-0 bg-transparent"
						onClick={() => setLightboxIndex(i + 1)}
					>
						<Image
							src={src}
							alt={`${title} ${i + 2}`}
							fill
							sizes="(min-width: 768px) 25vw, 100vw"
							className="object-cover transition-transform duration-500 group-hover:scale-105"
						/>
						{i === 3 && images.length > 5 && (
							<div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
								<span className="text-white text-lg font-semibold flex items-center gap-2">
									<Images size={20} /> +{images.length - 5} Fotos
								</span>
							</div>
						)}
					</button>
				))}
			</div>

			{lightboxIndex !== null && (
				<Lightbox
					images={images}
					initialIndex={lightboxIndex}
					title={title}
					onClose={() => setLightboxIndex(null)}
				/>
			)}
		</>
	);
}
