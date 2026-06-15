import { useEffect, useRef, useState } from "react";

/**
 * Counts from 0 up to `end` once the element scrolls into view.
 * Returns a ref to attach to the trigger element and the current value.
 */
export function useCountUp(end: number, duration = 1600) {
	const ref = useRef<HTMLElement | null>(null);
	const [value, setValue] = useState(0);
	const started = useRef(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const reduce = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (reduce) {
			setValue(end);
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting || started.current) return;
				started.current = true;
				observer.disconnect();

				const start = performance.now();
				const tick = (now: number) => {
					const p = Math.min((now - start) / duration, 1);
					// easeOutCubic
					const eased = 1 - (1 - p) ** 3;
					setValue(Math.round(eased * end));
					if (p < 1) requestAnimationFrame(tick);
				};
				requestAnimationFrame(tick);
			},
			{ threshold: 0.4 },
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [end, duration]);

	return { ref, value };
}
