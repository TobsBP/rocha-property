import type { Property } from "../properties.types";

export function BadgeChip({
	badge,
}: {
	badge: NonNullable<Property["badge"]>;
}) {
	const colors: Record<string, string> = {
		Exclusivo: "bg-primary/90 text-on-primary",
		Novo: "bg-surface-tint/90 text-on-primary",
		"Redução de Preço": "bg-tertiary/90 text-on-tertiary",
	};
	return (
		<span
			className={`${colors[badge]} text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm`}
		>
			{badge}
		</span>
	);
}
