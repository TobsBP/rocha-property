"use client";

import {
	Bath,
	Bed,
	Car,
	MapPin,
	Share2,
	SquareDashedBottom,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatPrice } from "#/lib/utils";
import type { Property } from "../properties.types";
import { BadgeChip } from "./BadgeChip";
import { ShareModal } from "./ShareModal";

export function PropertyCard({ property }: { property: Property }) {
	const [shareOpen, setShareOpen] = useState(false);

	const openShare = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setShareOpen(true);
	};

	return (
		<>
			<Link href={`/imoveis/${property.id}`} className="no-underline">
				<article className="bg-surface rounded-xl overflow-hidden card-shadow group cursor-pointer border border-surface-variant hover:-translate-y-1 transition-transform duration-300">
					<div className="relative aspect-4/3 overflow-hidden bg-surface-container-high">
						{property.images[0] && (
							<Image
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
								src={property.images[0]}
								alt={property.title}
								className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
							/>
						)}
						{property.badge && (
							<div className="absolute top-4 left-4">
								<BadgeChip badge={property.badge} />
							</div>
						)}
						<button
							type="button"
							onClick={openShare}
							aria-label="Compartilhar imóvel"
							className="absolute top-4 right-4 bg-surface/80 backdrop-blur-md p-2 rounded-full text-on-surface-variant hover:text-primary transition-colors shadow-sm"
						>
							<Share2 size={18} />
						</button>
					</div>
					<div className="p-4">
						<div className="text-lg font-bold text-primary mb-1">
							{formatPrice(property.price)}
						</div>
						<h3 className="text-base font-semibold text-on-surface truncate mb-1">
							{property.title}
						</h3>
						<p className="text-sm text-on-surface-variant mb-4 flex items-center gap-1">
							<MapPin size={14} />
							{property.address.neighborhood}, {property.address.city} -{" "}
							{property.address.state}
						</p>
						<div className="flex items-center gap-4 border-t border-surface-variant pt-3 text-on-surface-variant text-xs font-medium">
							<span className="flex items-center gap-1">
								<SquareDashedBottom size={14} /> {property.area}m²
							</span>
							<span className="flex items-center gap-1">
								<Bed size={14} /> {property.bedrooms}
							</span>
							<span className="flex items-center gap-1">
								<Bath size={14} /> {property.bathrooms}
							</span>
							<span className="flex items-center gap-1">
								<Car size={14} /> {property.parkingSpots}
							</span>
						</div>
					</div>
				</article>
			</Link>

			{shareOpen && (
				<ShareModal
					url={
						typeof window !== "undefined"
							? `${window.location.origin}/imoveis/${property.id}`
							: `/imoveis/${property.id}`
					}
					title={property.title}
					onClose={() => setShareOpen(false)}
				/>
			)}
		</>
	);
}
