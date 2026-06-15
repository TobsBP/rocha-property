import { timeAgo } from "#/lib/utils";
import type { Lead } from "#/modules/leads";
import { useLeads } from "#/modules/leads";

export function LeadsPanel() {
	const { data: response, isLoading } = useLeads();
	const leads = response?.data ?? [];

	return (
		<div className="lg:col-span-1 bg-surface rounded-xl border border-surface-variant shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col">
			<div className="p-5 border-b border-surface-variant flex justify-between items-center">
				<h3 className="text-lg font-semibold text-on-surface">Recent Leads</h3>
				<span className="bg-error-container text-on-error-container text-xs font-semibold px-2 py-0.5 rounded-full">
					New
				</span>
			</div>

			<div className="p-4 flex flex-col gap-3 overflow-y-auto flex-grow">
				{isLoading
					? [1, 2, 3].map((i) => (
							<div
								key={i}
								className="p-4 rounded-lg border border-surface-variant animate-pulse"
							>
								<div className="flex justify-between mb-2">
									<div className="h-3 bg-surface-container-high rounded w-28" />
									<div className="h-3 bg-surface-container-high rounded w-12" />
								</div>
								<div className="h-2 bg-surface-container-high rounded w-full mb-1" />
								<div className="h-2 bg-surface-container-high rounded w-3/4" />
							</div>
						))
					: leads.map((lead: Lead) => (
							<div
								key={lead.id}
								className="p-4 rounded-lg border border-surface-variant bg-surface-container-lowest hover:border-primary-fixed-dim transition-colors cursor-pointer group"
							>
								<div className="flex justify-between items-start mb-2">
									<h4 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
										{lead.name}
									</h4>
									<span className="text-xs text-on-surface-variant">
										{timeAgo(lead.createdAt)}
									</span>
								</div>
								<p className="text-xs text-on-surface-variant mb-3 line-clamp-2 leading-relaxed">
									{lead.message}
								</p>
								{lead.propertyName ? (
									<span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded w-fit inline-block">
										{lead.propertyName}
									</span>
								) : (
									<span className="text-[10px] font-medium text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded w-fit inline-block">
										Contato Geral
									</span>
								)}
							</div>
						))}
			</div>

			<div className="p-4 border-t border-surface-variant">
				<button
					type="button"
					className="w-full py-2 rounded-lg border border-outline-variant text-on-surface text-sm font-medium hover:bg-surface-container-high transition-colors"
				>
					View Inbox
				</button>
			</div>
		</div>
	);
}
