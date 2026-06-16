import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { isAuthenticated } from "#/modules/auth";

export function NavBar({
	activePage = "home",
	transparent = false,
}: {
	activePage?: string;
	/** Float over a dark hero until the user scrolls (home page). */
	transparent?: boolean;
}) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [theme, setTheme] = useState<"light" | "dark">(() => {
		if (typeof window === "undefined") return "dark";
		return (localStorage.getItem("theme") as "light" | "dark") || "dark";
	});
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setIsLoggedIn(isAuthenticated());
		setMounted(true);
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

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	// Light = white text over the hero; solid = glass bar with brand colors.
	const light = transparent && !scrolled && !mobileOpen;

	const links = [
		{ label: "Home", href: "/", key: "home" },
		{ label: "Imóveis", href: "/imoveis", key: "imoveis" },
		{ label: "Contratos", href: "/contracts", key: "contracts" },
		{ label: "Sobre", href: "/about", key: "about" },
		...(isLoggedIn ? [{ label: "Admin", href: "/admin", key: "admin" }] : []),
	] as const;

	return (
		<nav
			className={[
				"top-0 inset-x-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
				transparent ? "fixed" : "sticky",
				light
					? "bg-transparent"
					: "bg-surface/80 backdrop-blur-xl shadow-sm border-b border-outline-variant/30",
			].join(" ")}
		>
			<div
				className={[
					"flex justify-between items-center w-full px-4 md:px-10 max-w-[1280px] mx-auto transition-all duration-500",
					scrolled ? "h-16" : "h-20",
				].join(" ")}
			>
				<Link
					href="/"
					className="flex items-center no-underline h-full shrink-0"
				>
					<span
						style={{ fontFamily: "'Monsieur La Doulaise', cursive" }}
						className={[
							"text-4xl md:text-5xl font-normal tracking-wide transition-colors duration-500",
							light ? "text-white drop-shadow-md" : "text-primary",
						].join(" ")}
					>
						Fabiana Rocha
					</span>
				</Link>

				<div className="hidden md:flex gap-1 items-center">
					{links.map((link) => {
						const isActive = activePage === link.key;
						return (
							<Link
								key={link.key}
								href={link.href}
								className={[
									"group relative text-sm font-medium px-3 py-2 no-underline transition-colors duration-300",
									light
										? isActive
											? "text-white"
											: "text-white/75 hover:text-white"
										: isActive
											? "text-primary"
											: "text-on-surface-variant hover:text-primary",
								].join(" ")}
							>
								{link.label}
								<span
									className={[
										"pointer-events-none absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full origin-left transition-transform duration-300",
										light ? "bg-white" : "bg-primary",
										isActive
											? "scale-x-100"
											: "scale-x-0 group-hover:scale-x-100",
									].join(" ")}
								/>
							</Link>
						);
					})}
				</div>

				<div className="flex items-center gap-1.5">
					<Link
						href="/imoveis"
						className={[
							"hidden md:inline-flex items-center text-sm font-bold px-5 py-2.5 rounded-full no-underline transition-all duration-300 hover:-translate-y-0.5",
							light
								? "bg-white/95 text-primary hover:bg-white shadow-lg"
								: "bg-primary text-on-primary hover:bg-on-primary-fixed-variant shadow-md",
						].join(" ")}
					>
						Ver imóveis
					</Link>
					<button
						type="button"
						className={[
							"p-2.5 rounded-full transition-all duration-300 active:scale-90",
							light
								? "text-white hover:bg-white/15"
								: "text-primary hover:bg-surface-container-low",
						].join(" ")}
						onClick={toggleTheme}
						aria-label="Alternar tema"
					>
						<span className="block transition-transform duration-500 hover:rotate-45">
							{!mounted ? (
								<span className="inline-block w-5 h-5" />
							) : theme === "light" ? (
								<Moon size={20} />
							) : (
								<Sun size={20} />
							)}
						</span>
					</button>
					<button
						type="button"
						className={[
							"md:hidden p-2.5 rounded-full transition-all duration-300 active:scale-90",
							light
								? "text-white hover:bg-white/15"
								: "text-primary hover:bg-surface-container-low",
						].join(" ")}
						onClick={() => setMobileOpen((v) => !v)}
						aria-label="Menu"
					>
						{mobileOpen ? <X size={22} /> : <Menu size={22} />}
					</button>
				</div>
			</div>

			{/* Mobile menu */}
			<div
				className={[
					"md:hidden overflow-hidden transition-[max-height,opacity] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
					"bg-surface/95 backdrop-blur-xl border-t border-outline-variant",
					mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
				].join(" ")}
			>
				<div className="px-4 py-4 flex flex-col gap-1">
					{links.map((link, i) => (
						<Link
							key={link.key}
							href={link.href}
							onClick={() => setMobileOpen(false)}
							style={{
								transitionDelay: mobileOpen ? `${i * 45 + 60}ms` : "0ms",
							}}
							className={[
								"text-sm font-medium px-3 py-3 rounded-xl no-underline transition-all duration-300",
								mobileOpen
									? "translate-x-0 opacity-100"
									: "-translate-x-3 opacity-0",
								activePage === link.key
									? "text-primary font-bold bg-primary-fixed/30"
									: "text-on-surface-variant hover:text-primary hover:bg-surface-container-low",
							].join(" ")}
						>
							{link.label}
						</Link>
					))}
				</div>
			</div>
		</nav>
	);
}
