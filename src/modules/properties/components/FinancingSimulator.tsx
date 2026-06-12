import { Landmark } from "lucide-react";
import { useState } from "react";
import { calcMonthlyPayment, formatPrice } from "#/lib/utils";

export function FinancingSimulator({ price }: { price: number }) {
	const [downPercent, setDownPercent] = useState(20);
	const [months, setMonths] = useState(360);

	const downValue = price * (downPercent / 100);
	const monthly = calcMonthlyPayment(price, downPercent, months);

	return (
		<div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-surface-variant">
			<div className="flex items-center gap-2 mb-5">
				<Landmark size={20} className="text-primary" />
				<h3 className="text-lg font-semibold text-on-surface">
					Simulador de Financiamento
				</h3>
			</div>
			<div className="flex flex-col gap-4">
				<div>
					<div className="flex justify-between mb-1">
						<span className="text-xs font-semibold text-on-surface-variant">
							Valor do Imóvel
						</span>
						<span className="text-xs font-bold text-on-surface">
							{formatPrice(price)}
						</span>
					</div>
					<div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
						<div className="bg-primary h-full w-full" />
					</div>
				</div>
				<div>
					<div className="flex justify-between mb-1">
						<span className="text-xs font-semibold text-on-surface-variant">
							Entrada ({downPercent}%)
						</span>
						<span className="text-xs font-bold text-on-surface">
							{formatPrice(downValue)}
						</span>
					</div>
					<input
						type="range"
						min={10}
						max={80}
						value={downPercent}
						onChange={(e) => setDownPercent(Number(e.target.value))}
						className="w-full accent-primary"
					/>
				</div>
				<div>
					<label
						htmlFor="financing-months"
						className="block text-xs font-semibold text-on-surface-variant mb-1"
					>
						Prazo (Meses)
					</label>
					<select
						id="financing-months"
						value={months}
						onChange={(e) => setMonths(Number(e.target.value))}
						className="w-full rounded-lg border border-outline-variant bg-surface-bright px-3 py-2.5 text-sm text-on-surface focus:border-primary outline-none"
					>
						<option value={360}>360 meses (30 anos)</option>
						<option value={240}>240 meses (20 anos)</option>
						<option value={120}>120 meses (10 anos)</option>
					</select>
				</div>
				<div className="mt-2 p-4 bg-surface-container-low rounded-lg border border-surface-variant flex flex-col items-center">
					<span className="text-xs font-semibold text-on-surface-variant">
						Parcela Estimada
					</span>
					<span className="text-2xl font-semibold text-primary mt-1">
						{formatPrice(monthly)}
						<span className="text-sm font-normal text-on-surface-variant">
							/mês
						</span>
					</span>
				</div>
			</div>
		</div>
	);
}
