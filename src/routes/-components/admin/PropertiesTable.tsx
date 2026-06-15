import { Building2, Pencil, Trash2 } from "lucide-react";
import { formatPrice } from "#/lib/utils";
import type { AdminPropertyListItem } from "#/modules/properties";
import { StatusBadge, useAdminProperties } from "#/modules/properties";

/** A API devolve `price` como string; formata se for numérico, senão exibe cru. */
function formatPriceLabel(price: string): string {
	const num = Number(price);
	return price !== "" && Number.isFinite(num) ? formatPrice(num) : price;
}

export function PropertiesTable({
	onEdit,
	onDelete,
}: {
	onEdit: (p: AdminPropertyListItem) => void;
	onDelete: (id: string) => void;
}) {
	const { data, isLoading } = useAdminProperties();
	const properties = Array.isArray(data) ? data : [];

	return (
		<div className="lg:col-span-2 bg-surface rounded-xl border border-surface-variant shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col min-h-[500px]">
			<div className="p-5 border-b border-surface-variant flex justify-between items-center">
				<h3 className="text-lg font-semibold text-on-surface">
					Property Listings
				</h3>
				<span className="text-sm text-on-surface-variant">
					{properties.length} properties total
				</span>
			</div>
			<div className="overflow-x-auto flex-grow">
				<table className="w-full text-left border-collapse min-w-[600px]">
					<thead>
						<tr className="bg-surface-container-lowest border-b border-surface-variant">
							<th className="text-xs font-bold text-on-surface-variant py-3 px-5 uppercase tracking-wider w-1/2">
								Property
							</th>
							<th className="text-xs font-bold text-on-surface-variant py-3 px-5 uppercase tracking-wider whitespace-nowrap">
								Status
							</th>
							<th className="text-xs font-bold text-on-surface-variant py-3 px-5 uppercase tracking-wider whitespace-nowrap">
								Price
							</th>
							<th className="text-xs font-bold text-on-surface-variant py-3 px-5 uppercase tracking-wider text-right whitespace-nowrap">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-surface-variant">
						{isLoading ? (
							[1, 2, 3].map((i) => (
								<tr key={i} className="animate-pulse">
									<td className="py-4 px-5">
										<div className="flex items-center gap-3">
											<div className="w-16 h-12 rounded bg-surface-container-high" />
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
						) : properties.length === 0 ? (
							<tr>
								<td
									colSpan={4}
									className="py-10 text-center text-on-surface-variant font-medium"
								>
									Nenhum imóvel encontrado.
								</td>
							</tr>
						) : (
							properties.map((p: AdminPropertyListItem) => (
								<tr
									key={p.id}
									className="hover:bg-surface-bright transition-colors group"
								>
									<td className="py-4 px-5">
										<div className="flex items-center gap-3">
											<div className="h-12 rounded bg-surface-container-low border border-outline-variant flex-shrink-0 flex items-center justify-center w-16 overflow-hidden">
												{p.imageUrl ? (
													<img
														src={p.imageUrl}
														alt={p.title || p.name}
														className="w-full h-full object-cover"
													/>
												) : (
													<Building2
														size={20}
														className="text-on-surface-variant"
													/>
												)}
											</div>
											<div className="min-w-0">
												<p className="text-sm font-semibold text-on-surface break-words">
													{p.name || p.title || "—"}
												</p>
												<p className="text-xs text-on-surface-variant break-words">
													{p.location ||
														[p.neighborhood, p.city, p.state]
															.filter(Boolean)
															.join(", ")}
												</p>
											</div>
										</div>
									</td>
									<td className="py-4 px-5 whitespace-nowrap">
										<StatusBadge status={p.status} />
									</td>
									<td className="py-4 px-5 text-sm text-on-surface whitespace-nowrap font-medium">
										{formatPriceLabel(p.price)}
									</td>
									<td className="py-4 px-5 text-right whitespace-nowrap">
										<div className="flex items-center justify-end gap-2 transition-opacity">
											<button
												type="button"
												onClick={() => onEdit(p)}
												className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors"
												title="Edit"
											>
												<Pencil size={16} />
											</button>
											<button
												type="button"
												onClick={() => onDelete(p.id)}
												className="w-8 h-8 rounded-full flex items-center justify-center text-error hover:bg-error-container transition-colors"
												title="Delete"
											>
												<Trash2 size={16} />
											</button>
										</div>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
