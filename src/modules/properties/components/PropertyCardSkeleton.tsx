export function PropertyCardSkeleton() {
	return (
		<div className="bg-surface rounded-xl overflow-hidden card-shadow border border-surface-variant animate-pulse">
			<div className="aspect-[4/3] bg-surface-container-high" />
			<div className="p-4 flex flex-col gap-3">
				<div className="h-5 bg-surface-container-high rounded w-1/3" />
				<div className="h-4 bg-surface-container-high rounded w-2/3" />
				<div className="h-3 bg-surface-container-high rounded w-1/2" />
				<div className="h-3 bg-surface-container-high rounded mt-2" />
			</div>
		</div>
	);
}
