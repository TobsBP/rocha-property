import { Link } from "@tanstack/react-router";
import { Bed, Car, Heart, MapPin, Ruler } from "lucide-react";
import { formatPrice } from "#/lib/utils";
import type { Property } from "../properties.types";

export function SimilarCard({ property }: { property: Property }) {
	return (
		<Link
			to="/imoveis/$id"
			params={{ id: property.id }}
			className="no-underline"
		>
			<div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden group cursor-pointer border border-surface-variant hover:-translate-y-1 transition-transform duration-300">
				<div className="relative h-48 overflow-hidden">
					{property.images[0] && (
						<img
							src={property.images[0]}
							alt={property.title}
							className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
						/>
					)}
					<button
						type="button"
						className="absolute top-4 right-4 glass-panel p-2 rounded-full text-on-surface hover:text-primary transition-colors"
					>
						<Heart size={16} />
					</button>
					<div className="absolute bottom-4 left-4 bg-surface-container-lowest/90 backdrop-blur-sm px-3 py-1 rounded-md">
						<span className="text-xs font-bold text-primary">
							{formatPrice(property.price)}
						</span>
					</div>
				</div>
				<div className="p-4 flex flex-col gap-2">
					<h4 className="text-base font-semibold text-on-surface truncate">
						{property.title}
					</h4>
					<p className="text-xs text-on-surface-variant flex items-center gap-1">
						<MapPin size={12} /> {property.address.neighborhood},{" "}
						{property.address.city}
					</p>
					<div className="flex items-center gap-4 mt-2 text-on-surface-variant text-xs border-t border-surface-variant pt-3">
						<span className="flex items-center gap-1">
							<Ruler size={12} /> {property.area}m²
						</span>
						<span className="flex items-center gap-1">
							<Bed size={12} /> {property.bedrooms}
						</span>
						<span className="flex items-center gap-1">
							<Car size={12} /> {property.parkingSpots}
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
}
