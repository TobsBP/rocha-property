import type { Lead } from "../leads.types";

export function LeadTypeBadge({
	type,
	intent,
}: {
	type: Lead["type"];
	intent?: Lead["intent"];
}) {
	const typeLabels: Record<Lead["type"], string> = {
		viewing: "Viewing",
		question: "Question",
		seller: "Seller",
	};
	return (
		<div className="flex gap-2 flex-wrap">
			<span className="inline-flex items-center px-2 py-1 rounded bg-surface-container-high text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
				{typeLabels[type]}
			</span>
			{intent === "high" && (
				<span className="inline-flex items-center px-2 py-1 rounded bg-tertiary-fixed text-[11px] font-semibold text-on-tertiary-fixed uppercase tracking-wider">
					High Intent
				</span>
			)}
		</div>
	);
}
