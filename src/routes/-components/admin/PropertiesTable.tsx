import { Building2, Pencil, Trash2 } from "lucide-react";
import { formatPrice } from "#/lib/utils";
import type { AdminPropertyListItem } from "#/modules/properties";
import { StatusBadge, useAdminProperties } from "#/modules/properties";

/** A API devolve `price` como string; formata se for numérico, senão exibe cru. */
function formatPriceLabel(price: string): string {
	const num = Number(price);
	return price !== "" && Number.isFinite(num) ? formatPrice(num) : price;
}

export function PropertiesTable() {
	const { data, isLoading } = useAdminProperties();
	const properties = Array.isArray(data) ? data : [];

	return (
		<div className="lg:col-span-2 bg-surface rounded-xl border border-surface-variant shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
			<div className="p-5 border-b border-surface-variant flex justify-between items-center">
				<h3 className="text-lg font-semibold text-on-surface">
					Recent Properties
				</h3>
				<button
					type="button"
					className="text-sm font-semibold text-primary hover:text-on-primary-fixed-variant transition-colors"
				>
					View All
				</button>
			</div>
			<div className="overflow-x-auto">
				<table className="w-full text-left border-collapse">
					<thead>
						<tr className="bg-surface-container-lowest border-b border-surface-variant">
							{["Property", "Status", "Price", "Actions"].map((h, i) => (
								<th
									key={h}
									className={`text-xs font-bold text-on-surface-variant py-3 px-5 uppercase tracking-wider ${i === 3 ? "text-right" : ""}`}
								>
									{h}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="divide-y divide-surface-variant">
						{isLoading
							? [1, 2, 3].map((i) => (
									<tr key={i} className="animate-pulse">
										<td className="py-4 px-5">
											<div className="flex items-center gap-3">
												<div className="w-12 h-12 rounded bg-surface-container-high" />
												<div className="flex flex-col gap-1">
													<div className="h-3 bg-surface-container-high rounded w-32" />
													<div className="h-2 bg-surface-container-high rounded w-20" />
												</div>
											</div>
										</td>
										<td className="py-4 px-5">
											<div className="h-6 bg-surface-container-high rounded w-16" />
										</td>
										<td className="py-4 px-5">
											<div className="h-3 bg-surface-container-high rounded w-24" />
										</td>
										<td className="py-4 px-5" />
									</tr>
								))
							: properties.map((p: AdminPropertyListItem) => (
									<tr
										key={p.id}
										className="hover:bg-surface-bright transition-colors group"
									>
										<td className="py-4 px-5">
											<div className="flex items-center gap-3">
												<div className="w-12 h-12 rounded bg-surface-container-low border border-outline-variant flex-shrink-0 flex items-center justify-center">
													<Building2
														size={20}
														className="text-on-surface-variant"
													/>
												</div>
												<div>
													<p className="text-sm font-semibold text-on-surface">
														{p.name || p.title || "—"}
													</p>
													<p className="text-xs text-on-surface-variant">
														{p.location ||
															[p.neighborhood, p.city, p.state]
																.filter(Boolean)
																.join(", ")}
													</p>
												</div>
											</div>
										</td>
										<td className="py-4 px-5">
											<StatusBadge status={p.status} />
										</td>
										<td className="py-4 px-5 text-sm text-on-surface">
											{formatPriceLabel(p.price)}
										</td>
										<td className="py-4 px-5 text-right">
											<div className="flex items-center justify-end gap-2 transition-opacity">
												<button
													type="button"
													className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors"
													title="Edit"
												>
													<Pencil size={16} />
												</button>
												<button
													type="button"
													className="w-8 h-8 rounded-full flex items-center justify-center text-error hover:bg-error-container transition-colors"
													title="Delete"
												>
													<Trash2 size={16} />
												</button>
											</div>
										</td>
									</tr>
								))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
