import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/** Formata um valor em reais sem casas decimais. Ex.: R$ 2.450.000 */
export function formatPrice(price: number): string {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
		maximumFractionDigits: 0,
	}).format(price);
}

/** Formata um valor em milhões de forma compacta. Ex.: R$ 4.2M */
export function formatMillions(value: number): string {
	return `R$ ${(value / 1_000_000).toFixed(1)}M`;
}

/** Tempo relativo em português a partir de uma data ISO. Ex.: 3h atrás */
export function timeAgo(iso: string): string {
	const diffMs = Date.now() - new Date(iso).getTime();
	const diffH = Math.floor(diffMs / (1000 * 60 * 60));
	if (diffH < 1) return "agora";
	if (diffH < 24) return `${diffH}h atrás`;
	const diffD = Math.floor(diffH / 24);
	return `${diffD}d atrás`;
}

/** Parcela mensal estimada (Price/PMT) para um financiamento de `months` meses. */
export function calcMonthlyPayment(
	price: number,
	downPercent: number,
	months: number,
): number {
	const principal = price * (1 - downPercent / 100);
	const r = 0.009;
	return (principal * r * (1 + r) ** months) / ((1 + r) ** months - 1);
}
