import { useLocation } from "react-router-dom";
import { IBooking } from "@/models/IBooking";
import UserEditBookingForm from "@/components/forms/UserEditBookingForm";

export default function UserEditBookingFormPage() {
	const booking = useLocation().state as IBooking;

	return (
		<>
			<h2 className={"text-white text-center text-3xl font-bold mb-10"}>Rediger Booking</h2>
			<section className="flex justify-center">
				<UserEditBookingForm booking={booking} />
			</section>
		</>
	);
}
