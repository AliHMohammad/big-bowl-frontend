import { IBooking } from "@/models/IBooking";
import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

type Props = {
	booking: IBooking;
};

export default function UserBooking({ booking }: Props) {
	return (
		<article className="bg-red-400">
			<p>{booking.activity.name}</p>
			<Link to={"form"} state={booking}>
				<Button>Rediger</Button>
			</Link>
		</article>
	);
}
