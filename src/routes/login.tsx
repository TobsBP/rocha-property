import { createFileRoute, Link } from "@tanstack/react-router";
import { LoginForm } from "#/modules/auth";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
	return (
		<div className="flex min-h-screen items-center justify-center px-4 py-12 font-[Inter,ui-sans-serif,system-ui,sans-serif]">
			<div className="w-full max-w-md">
				<div className="mb-8 text-center">
					<Link to="/" className="inline-flex items-center no-underline">
						<span
							style={{ fontFamily: "'Monsieur La Doulaise', cursive" }}
							className="text-6xl text-primary font-normal"
						>
							Fabiana Rocha
						</span>
					</Link>
				</div>

				<div className="rounded-2xl border border-surface-variant bg-surface-container-lowest p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
					<div className="mb-6">
						<h1 className="text-2xl font-semibold tracking-tight text-on-surface">
							Bem-vindo de volta
						</h1>
						<p className="mt-1 text-sm text-on-surface-variant">
							Acesse o portal para gerenciar imóveis e leads.
						</p>
					</div>

					<LoginForm />
				</div>

				<p className="mt-6 text-center text-sm text-on-surface-variant">
					Não tem uma conta?{" "}
					<Link to="/" className="font-medium text-primary no-underline">
						Fale com a equipe
					</Link>
				</p>
			</div>
		</div>
	);
}
