import { Images } from "lucide-react";
import { useState } from "react";

export function ImageGallery({
	images,
	title,
}: {
	images: string[];
	title: string;
}) {
	const [active, setActive] = useState(0);
	const shown = images.slice(0, 5);

	return (
		<div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-90 md:h-153.5 rounded-xl overflow-hidden">
			<button
				type="button"
				className="md:col-span-2 md:row-span-2 relative group cursor-pointer overflow-hidden p-0 border-0 bg-transparent"
				onClick={() => setActive(0)}
			>
				<img
					src={shown[active] ?? shown[0]}
					alt={title}
					className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
				/>
			</button>
			{shown.slice(1, 5).map((src, i) => (
				<button
					type="button"
					key={src}
					className="hidden md:block relative group cursor-pointer overflow-hidden p-0 border-0 bg-transparent"
					onClick={() => setActive(i + 1)}
				>
					<img
						src={src}
						alt={`${title} ${i + 2}`}
						className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
	);
}
