import { Skeleton } from "@/components/ui/skeleton.tsx";
import SkeletonLine from "@/components/core/skeletons/SkeletonLine.tsx";

export function SkeletonBookingCard() {


	return (
		<div className="flex flex-col space-y-3">
			<Skeleton className="h-[150px] w-[230px] rounded-xl" />
			<div className="space-y-2">
				<Skeleton className="h-4 w-[230px]" />
				<Skeleton className="h-4 w-[200px]" />
				<Skeleton className="h-4 w-[230px]" />
				<Skeleton className="h-4 w-[200px]" />
				<Skeleton className="h-4 w-[230px]" />
				<span className="flex gap-3 p-2 justify-center">
					<Skeleton className="h-10 w-24" />
					<Skeleton className="h-10 w-24" />
				</span>
				<div className="flex justify-center p-4">
					<Skeleton className="h-10 w-20" />

				</div>


			</div>
		</div>
	);
}