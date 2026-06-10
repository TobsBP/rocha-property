import type { PropertyStatus } from "../properties.types";

export function StatusBadge({ status }: { status: PropertyStatus }) {
	const styles: Record<PropertyStatus, string> = {
		active: "bg-[#e6f4ea] text-[#137333] border border-[#ceead6]",
		pending: "bg-[#fff8e1] text-[#f57f17] border border-[#ffecb3]",
		draft:
			"bg-surface-container-highest text-on-surface border border-outline-variant",
		sold: "bg-primary-fixed text-on-primary-fixed border border-outline-variant",
	};
	const labels: Record<PropertyStatus, string> = {
		active: "Active",
		pending: "Pending",
		draft: "Draft",
		sold: "Sold",
	};
	return (
		<span
			className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
		>
			{labels[status]}
		</span>
	);
}
