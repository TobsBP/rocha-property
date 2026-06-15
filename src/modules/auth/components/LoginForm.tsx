import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSignIn } from "../auth.hooks";

export function LoginForm({ redirectTo = "/admin" }: { redirectTo?: string }) {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const { mutate, isPending, error } = useSignIn();

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		mutate({ email, password }, { onSuccess: () => router.push(redirectTo) });
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-5">
			{error && (
				<div className="rounded-lg bg-error-container px-4 py-3 text-sm font-medium text-on-error-container">
					{error instanceof Error
						? error.message
						: "Não foi possível entrar. Verifique suas credenciais."}
				</div>
			)}

			<div>
				<label
					htmlFor="email"
					className="mb-1 block text-xs font-semibold text-on-surface-variant"
				>
					E-mail
				</label>
				<div className="relative">
					<Mail
						size={18}
						className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
					/>
					<input
						id="email"
						type="email"
						required
						autoComplete="email"
						placeholder="seu@email.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full rounded-lg border border-outline-variant bg-surface-bright py-2.5 pl-10 pr-3 text-sm text-on-surface outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
					/>
				</div>
			</div>

			<div>
				<label
					htmlFor="password"
					className="mb-1 block text-xs font-semibold text-on-surface-variant"
				>
					Senha
				</label>
				<div className="relative">
					<Lock
						size={18}
						className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
					/>
					<input
						id="password"
						type={showPassword ? "text" : "password"}
						required
						autoComplete="current-password"
						placeholder="••••••••"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full rounded-lg border border-outline-variant bg-surface-bright py-2.5 pl-10 pr-10 text-sm text-on-surface outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
					/>
					<button
						type="button"
						onClick={() => setShowPassword((v) => !v)}
						aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors hover:text-primary"
					>
						{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
					</button>
				</div>
			</div>

			<div className="flex items-center justify-between text-sm">
				<label className="flex items-center gap-2 text-on-surface-variant">
					<input
						type="checkbox"
						className="h-4 w-4 rounded border-outline-variant accent-primary"
					/>
					Lembrar-me
				</label>
				<a href="/login" className="font-medium text-primary no-underline">
					Esqueceu a senha?
				</a>
			</div>

			<button
				type="submit"
				disabled={isPending}
				className="mt-1 w-full rounded-lg bg-primary py-3 text-base font-semibold text-on-primary shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:bg-on-primary-fixed-variant hover:shadow-md disabled:opacity-70"
			>
				{isPending ? "Entrando…" : "Entrar"}
			</button>
		</form>
	);
}
