"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

export interface FilterOption {
	value: string;
	label: string;
}

interface Props {
	icon: React.ReactNode;
	/** Texto exibido quando nada está selecionado. */
	placeholder: string;
	value: string;
	options: FilterOption[];
	onChange: (value: string) => void;
}

export function FilterSelect({
	icon,
	placeholder,
	value,
	options,
	onChange,
}: Props) {
	const [open, setOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const listId = useId();

	const selected = options.find((o) => o.value === value);

	useEffect(() => {
		if (!open) return;
		function onPointerDown(e: PointerEvent) {
			if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
		}
		function onKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") setOpen(false);
		}
		document.addEventListener("pointerdown", onPointerDown);
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("pointerdown", onPointerDown);
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [open]);

	function choose(next: string) {
		onChange(next);
		setOpen(false);
	}

	return (
		<div ref={rootRef} className="relative">
			<span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none z-10">
				{icon}
			</span>
			<button
				type="button"
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-controls={listId}
				onClick={() => setOpen((v) => !v)}
				className="w-full pl-11 pr-9 py-3.5 rounded-xl border border-outline-variant bg-surface text-left text-sm transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 data-[open=true]:border-primary data-[open=true]:ring-2 data-[open=true]:ring-primary/25"
				data-open={open}
			>
				<span
					className={selected ? "text-on-surface" : "text-on-surface-variant"}
				>
					{selected ? selected.label : placeholder}
				</span>
				<ChevronDown
					size={18}
					className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant transition-transform duration-200 data-[open=true]:rotate-180"
					data-open={open}
				/>
			</button>

			{open && (
				<div
					id={listId}
					role="listbox"
					className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 flex origin-top flex-col gap-0.5 overflow-hidden rounded-xl border border-outline-variant bg-surface p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.18)] [animation:rise-in_140ms_ease-out]"
				>
					{options.map((opt) => {
						const active = opt.value === value;
						return (
							<button
								key={opt.value}
								type="button"
								role="option"
								aria-selected={active}
								onClick={() => choose(opt.value)}
								className={[
									"flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
									active
										? "bg-primary-container font-semibold text-on-primary-container"
										: "text-on-surface hover:bg-surface-container-high",
								].join(" ")}
							>
								{opt.label}
								{active && <Check size={16} />}
							</button>
						);
					})}
				</div>
			)}
		</div>
	);
}
