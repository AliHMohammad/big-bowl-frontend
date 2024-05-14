import { IBooking } from "@/models/IBooking";
import { getAllBookingsById } from "@/services/bookingApi";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import UserBooking from "@/components/core/UserBooking";

export default function UserBookingsPage() {
	const [bookings, setBookings] = useState<IBooking[] | null>(null);
	const { userId } = useAuth();

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

	console.log(bookings);
	

	return (
		<div>
			<div>Dine Reservationer</div>
			<div className="flex gap-2">{bookings?.map((b) => <UserBooking key={b.id} booking={b} />)}</div>
		</div>
	);
}
