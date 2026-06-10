import { Star } from "lucide-react";
import { useState } from "react";
import { useSubmitLead } from "../leads.hooks";

export function LeadForm({
	propertyId,
	propertyTitle,
}: {
	propertyId: string;
	propertyTitle: string;
}) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [message, setMessage] = useState(
		`Olá, gostaria de mais informações sobre ${propertyTitle}...`,
	);
	const [success, setSuccess] = useState(false);

	const { mutate, isPending } = useSubmitLead();

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		mutate(
			{ name, email, phone, message, propertyId },
			{ onSuccess: () => setSuccess(true) },
		);
	}

	if (success) {
		return (
			<div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-surface-variant text-center">
				<div className="w-14 h-14 bg-tertiary-fixed rounded-full flex items-center justify-center mx-auto mb-3">
					<Star size={24} className="text-on-tertiary-fixed" />
				</div>
				<h3 className="text-lg font-semibold text-on-surface mb-1">
					Mensagem enviada!
				</h3>
				<p className="text-sm text-on-surface-variant">
					Um corretor entrará em contato em breve.
				</p>
			</div>
		);
	}

	return (
		<div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-surface-variant">
			<h3 className="text-xl font-semibold text-on-surface mb-5">
				Tenho Interesse
			</h3>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<div>
					<label className="block text-xs font-semibold text-on-surface-variant mb-1">
						Nome Completo
					</label>
					<input
						type="text"
						required
						placeholder="Seu nome"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="w-full rounded-lg border border-outline-variant bg-surface-bright px-3 py-2.5 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
					/>
				</div>
				<div>
					<label className="block text-xs font-semibold text-on-surface-variant mb-1">
						E-mail
					</label>
					<input
						type="email"
						required
						placeholder="seu@email.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full rounded-lg border border-outline-variant bg-surface-bright px-3 py-2.5 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
					/>
				</div>
				<div>
					<label className="block text-xs font-semibold text-on-surface-variant mb-1">
						Telefone / WhatsApp
					</label>
					<input
						type="tel"
						placeholder="(11) 90000-0000"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						className="w-full rounded-lg border border-outline-variant bg-surface-bright px-3 py-2.5 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
					/>
				</div>
				<div>
					<label className="block text-xs font-semibold text-on-surface-variant mb-1">
						Mensagem
					</label>
					<textarea
						rows={3}
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						className="w-full rounded-lg border border-outline-variant bg-surface-bright px-3 py-2.5 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
					/>
				</div>
				<button
					type="submit"
					disabled={isPending}
					className="w-full bg-primary hover:bg-on-primary-fixed-variant disabled:opacity-70 text-on-primary py-3 rounded-lg text-base font-semibold shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all duration-200 mt-1"
				>
					{isPending ? "Enviando…" : "Falar com Corretor"}
				</button>
			</form>
		</div>
	);
}
