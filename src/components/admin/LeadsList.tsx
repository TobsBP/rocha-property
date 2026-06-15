import { Loader2, Mail, Phone } from "lucide-react";
import { timeAgo } from "#/lib/utils";
import { type Lead, useLeads } from "#/modules/leads";

export function LeadsList() {
	const { data: response, isLoading } = useLeads();
	const leads = response?.data ?? [];

	return (
		<div className="bg-surface rounded-xl border border-surface-variant shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col min-h-[500px]">
			<div className="p-5 border-b border-surface-variant flex justify-between items-center">
				<h3 className="text-lg font-semibold text-on-surface">
					Caixa de Entrada (Leads)
				</h3>
				<span className="text-sm text-on-surface-variant">
					{response?.meta.total ?? 0} leads totais
				</span>
			</div>

			<div className="overflow-x-auto flex-grow">
				<table className="w-full text-left border-collapse">
					<thead>
						<tr className="bg-surface-container-lowest border-b border-surface-variant">
							<th className="text-xs font-bold text-on-surface-variant py-3 px-5 uppercase tracking-wider">
								Contato
							</th>
							<th className="text-xs font-bold text-on-surface-variant py-3 px-5 uppercase tracking-wider">
								Interesse / Tipo
							</th>
							<th className="text-xs font-bold text-on-surface-variant py-3 px-5 uppercase tracking-wider">
								Mensagem
							</th>
							<th className="text-xs font-bold text-on-surface-variant py-3 px-5 uppercase tracking-wider text-right">
								Data
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-surface-variant">
						{isLoading ? (
							<tr>
								<td
									colSpan={4}
									className="py-10 text-center text-on-surface-variant"
								>
									<Loader2 size={24} className="mx-auto animate-spin mb-2" />
									Carregando leads...
								</td>
							</tr>
						) : leads.length === 0 ? (
							<tr>
								<td
									colSpan={4}
									className="py-10 text-center text-on-surface-variant font-medium"
								>
									Nenhum lead encontrado no momento.
								</td>
							</tr>
						) : (
							leads.map((lead: Lead) => (
								<tr
									key={lead.id}
									className="hover:bg-surface-bright transition-colors group"
								>
									<td className="py-4 px-5">
										<p className="text-sm font-bold text-on-surface mb-1">
											{lead.name}
										</p>
										<div className="flex flex-col gap-0.5 text-xs text-on-surface-variant">
											<span className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer w-fit">
												<Mail size={12} /> {lead.email}
											</span>
											<span className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer w-fit">
												<Phone size={12} /> {lead.phone}
											</span>
										</div>
									</td>
									<td className="py-4 px-5 align-top">
										<div className="flex flex-col items-start gap-2">
											{lead.propertyName ? (
												<span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">
													{lead.propertyName}
												</span>
											) : (
												<span className="text-xs font-medium text-on-surface-variant bg-surface-container-high px-2 py-1 rounded-md">
													Contato Geral
												</span>
											)}
										</div>
									</td>
									<td className="py-4 px-5 max-w-xs align-top">
										<p
											className="text-sm text-on-surface line-clamp-3 leading-relaxed"
											title={lead.message}
										>
											{lead.message}
										</p>
									</td>
									<td className="py-4 px-5 text-right align-top text-xs text-on-surface-variant font-medium whitespace-nowrap">
										{timeAgo(lead.createdAt)}
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
