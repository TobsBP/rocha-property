import {
	type ElementType,
	type ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";

/**
 * Scroll-reveal wrapper. Fades + lifts its children into view once, the first
 * time it enters the viewport. Honors prefers-reduced-motion via CSS.
 */
export function Reveal({
	children,
	as,
	className = "",
	delay = 0,
	y = 26,
	once = true,
}: {
	children: ReactNode;
	as?: ElementType;
	className?: string;
	delay?: number;
	y?: number;
	once?: boolean;
}) {
	const Tag = as ?? "div";
	const ref = useRef<HTMLElement | null>(null);
	const [revealed, setRevealed] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setRevealed(true);
					if (once) observer.disconnect();
				} else if (!once) {
					setRevealed(false);
				}
			},
			{ threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [once]);

	return (
		<Tag
			ref={ref}
			className={`reveal ${revealed ? "is-revealed" : ""} ${className}`}
			style={
				{
					"--reveal-delay": `${delay}ms`,
					"--reveal-y": `${y}px`,
				} as React.CSSProperties
			}
		>
			{children}
		</Tag>
	);
}
