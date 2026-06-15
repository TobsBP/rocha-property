import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Footer } from "#/components/Footer";
import { NavBar } from "#/components/NavBar";
import type { TransactionType } from "#/modules/properties";
import { useProperties } from "#/modules/properties";
import { AboutSection } from "./-components/home/AboutSection";
import { FeaturedSection } from "./-components/home/FeaturedSection";
import { HeroSection } from "./-components/home/HeroSection";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
	const [intent, setIntent] = useState<TransactionType>("compra");
	const { data: properties = [], isLoading } = useProperties({ intent });

	return (
		<div className="min-h-screen bg-background text-foreground font-[Inter,ui-sans-serif,system-ui,sans-serif] antialiased">
			<NavBar activePage="home" />
			<HeroSection intent={intent} setIntent={setIntent} />
			<main className="w-full max-w-7xl mx-auto px-4 md:px-10 py-10 md:py-20 flex flex-col gap-20">
				<FeaturedSection properties={properties} isLoading={isLoading} />
				<AboutSection />
			</main>
			<Footer />
		</div>
	);
}
