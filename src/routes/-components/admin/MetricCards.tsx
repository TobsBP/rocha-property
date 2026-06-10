import { BarChart2, Building2, Minus, TrendingUp, Users } from "lucide-react";
import { formatMillions } from "#/lib/utils";
import { useDashboardMetrics } from "#/modules/dashboard";

export function MetricCards() {
	const { data: metrics, isLoading } = useDashboardMetrics();

	const cards = metrics
		? [
				{
					icon: <Building2 size={22} />,
					label: "Total Listings",
					value: metrics.totalListings.toLocaleString(),
					delta: metrics.totalListingsDelta,
					deltaPositive: true,
				},
				{
					icon: <Users size={22} />,
					label: "Active Leads",
					value: metrics.activeLeads.toLocaleString(),
					delta: metrics.activeLeadsDelta,
					deltaPositive: true,
				},
				{
					icon: <span className="text-xl font-bold">R$</span>,
					label: "Monthly Sales Volume",
					value: formatMillions(metrics.monthlyVolume),
					delta: metrics.monthlyVolumeDelta,
					deltaPositive: false,
				},
				{
					icon: <BarChart2 size={22} />,
					label: "Conversion Rate",
					value: `${metrics.conversionRate}%`,
					chart: metrics.conversionData,
				},
			]
		: [];

	if (isLoading) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{[1, 2, 3, 4].map((i) => (
					<div
						key={i}
						className="bg-surface rounded-xl border border-surface-variant p-6 h-32 animate-pulse bg-surface-container-high"
					/>
				))}
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{cards.map((card, i) => (
				<div
					key={i}
					className="bg-surface rounded-xl border border-surface-variant p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-outline-variant transition-colors group"
				>
					<div className="flex justify-between items-start mb-4">
						<div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant group-hover:text-primary group-hover:bg-primary-fixed transition-colors">
							{card.icon}
						</div>
						{card.delta !== undefined ? (
							<span
								className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full gap-1 ${
									card.delta > 0
										? "text-tertiary bg-tertiary-fixed"
										: card.delta < 0
											? "text-error bg-error-container"
											: "text-on-surface-variant bg-surface-container-highest"
								}`}
							>
								{card.delta > 0 ? (
									<TrendingUp size={12} />
								) : (
									<Minus size={12} />
								)}
								{Math.abs(card.delta)}%
							</span>
						) : null}
					</div>
					<div>
						<p className="text-sm text-on-surface-variant mb-1">{card.label}</p>
						<h3 className="text-4xl font-bold text-on-surface leading-none">
							{card.value}
						</h3>
						{card.chart && (
							<div className="flex items-end gap-1 h-12 mt-3 opacity-80">
								{card.chart.map((h, j) => (
									<div
										key={j}
										className={`w-full rounded-t-sm transition-colors ${
											j === card.chart!.length - 2
												? "bg-primary shadow-[0_0_10px_rgba(162,5,19,0.3)]"
												: "bg-surface-container-highest hover:bg-outline-variant"
										}`}
										style={{ height: `${h}%` }}
									/>
								))}
							</div>
						)}
					</div>
				</div>
			))}
		</div>
	);
}
