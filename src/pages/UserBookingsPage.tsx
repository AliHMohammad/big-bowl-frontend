import { IBooking } from "@/models/IBooking";
import { getAllBookingsById } from "@/services/bookingApi";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import UserBooking from "@/components/core/UserBooking";
import { SkeletonCard } from "@/components/core/skeletons/SkeletonCard.tsx";
import { SkeletonBookingCard } from "@/components/core/skeletons/SkeletonBookingCard.tsx";

export default function UserBookingsPage() {
	const [bookings, setBookings] = useState<IBooking[] | null>(null);
	const { userId } = useAuth();
	const { user } = useUser();

	useEffect(() => {
		getAllBookingsById(userId as string)
			.then(({ data }) => {
				setBookings(data);
			})
			.catch(() => {
				toast({
					title: "Åh nej! Noget gik galt!",
					description: `Kunne ikke finde dine bookingerne i systemet. Prøv igen på et senere tidspunkt.`,
					variant: "destructive",
				});
			});
	}, [userId]);
	

	return (
		<section>
			<h2 className="text-white text-4xl mb-5 font-semibold">Dine Reservationer</h2>
			<div className="text-white mb-5">Hej {user?.firstName}, her er dine kommende reservationer</div>
			{bookings ? (
				<div className="flex flex-wrap gap-5">{bookings.map((b) => <UserBooking key={b.id} booking={b} />)}</div>
			) : (
				<div className="flex flex-wrap gap-2">
					<SkeletonBookingCard />
					<SkeletonBookingCard />
					<SkeletonBookingCard />
					<SkeletonBookingCard />
					<SkeletonBookingCard />
					<SkeletonBookingCard />
					<SkeletonBookingCard />
				</div>
			)}

		</section>
	);
}
