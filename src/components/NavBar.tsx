import { Link } from "@tanstack/react-router";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { isAuthenticated } from "#/modules/auth";

export function NavBar({ activePage = "home" }: { activePage?: string }) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [theme, setTheme] = useState(() => {
		if (typeof window !== "undefined") {
			return localStorage.getItem("theme") || "light";
		}
		return "light";
	});

	useEffect(() => {
		setIsLoggedIn(isAuthenticated());
	}, []);

	useEffect(() => {
		const root = window.document.documentElement;
		if (theme === "dark") {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}
		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	const links = [
		{ label: "Home", to: "/", key: "home" },
		{ label: "Imóveis", to: "/", key: "imoveis" },
		{ label: "Contratos", to: "/contracts", key: "contracts" },
		{ label: "Sobre", to: "/about", key: "about" },
		...(isLoggedIn ? [{ label: "Admin", to: "/admin", key: "admin" }] : []),
	] as const;

	return (
		<nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md shadow-sm border-b border-outline-variant/30">
			<div className="flex justify-between items-center w-full px-4 md:px-10 max-w-[1280px] mx-auto h-20">
				<Link to="/" className="flex items-center no-underline h-full">
					<span
						style={{ fontFamily: "'Monsieur La Doulaise', cursive" }}
						className="text-4xl md:text-5xl text-primary font-normal tracking-wide"
					>
						Fabiana Rocha
					</span>
				</Link>

				<div className="hidden md:flex gap-6 items-center">
					{links.map((link) => (
						<Link
							key={link.key}
							to={link.to}
							className={[
								"text-sm font-medium px-2 py-1 rounded transition-all no-underline",
								activePage === link.key
									? "text-primary font-bold border-b-2 border-primary pb-1"
									: "text-on-surface-variant hover:text-primary hover:bg-surface-container-low",
							].join(" ")}
						>
							{link.label}
						</Link>
					))}
				</div>

				<div className="flex items-center gap-2">
					<button
						type="button"
						className="p-2 rounded-full text-primary hover:bg-surface-container-low transition-all"
						onClick={toggleTheme}
						aria-label="Alternar tema"
					>
						{theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
					</button>
					<button
						type="button"
						className="md:hidden p-2 rounded-full text-primary hover:bg-surface-container-low transition-all"
						onClick={() => setMobileOpen((v) => !v)}
						aria-label="Menu"
					>
						{mobileOpen ? <X size={22} /> : <Menu size={22} />}
					</button>
				</div>
			</div>

			{mobileOpen && (
				<div className="md:hidden bg-surface border-t border-outline-variant px-4 py-4 flex flex-col gap-2">
					{links.map((link) => (
						<Link
							key={link.key}
							to={link.to}
							onClick={() => setMobileOpen(false)}
							className={[
								"text-sm font-medium px-3 py-2 rounded-lg transition-all no-underline",
								activePage === link.key
									? "text-primary font-bold bg-primary-fixed/30"
									: "text-on-surface-variant hover:text-primary hover:bg-surface-container-low",
							].join(" ")}
						>
							{link.label}
						</Link>
					))}
				</div>
			)}
		</nav>
	);
}
