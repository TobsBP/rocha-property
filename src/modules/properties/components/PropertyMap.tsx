import type { Property } from "../properties.types";

interface PropertyMapProps {
	address: Property["address"];
	className?: string;
}

/** Monta a query de busca do mapa a partir do endereço do imóvel. */
function buildQuery(address: Property["address"]): string {
	return [address.street, address.neighborhood, address.city, address.state]
		.filter(Boolean)
		.join(", ");
}

/**
 * Renderiza a localização do imóvel num iframe do Google Maps.
 * Usa o embed público (`output=embed`), que não exige chave de API.
 */
export function PropertyMap({ address, className }: PropertyMapProps) {
	const query = buildQuery(address);
	const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

	return (
		<div
			className={`w-full h-75 md:h-100 rounded-xl overflow-hidden border border-surface-variant ${className ?? ""}`}
		>
			<iframe
				title={`Mapa — ${query}`}
				src={src}
				className="w-full h-full border-0"
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade"
				allowFullScreen
			/>
		</div>
	);
}
