import { IBooking } from "@/models/IBooking";
import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { activityTypeDictionary } from "@/utils/dictionary.ts";
import { SkeletonCard } from "@/components/core/skeletons/SkeletonCard.tsx";
import { format } from "date-fns";
import { da } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { GoPerson } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";

type Props = {
	booking: IBooking;
};

export default function UserBooking({ booking }: Props) {
	const imgSrc = activityTypeDictionary[booking.activity.type];

	const date = format(new Date(booking.start), "PPP", { locale: da });
	const timeStart = format(new Date(booking.start), "p", { locale: da });
	const timeEnd = format(new Date(booking.end), "p", { locale: da });

	return (
		<>
			<article className="bg-orange-300 p-5 gap-3 rounded-md flex flex-col items-center w-60">
				<div className="w-52">
					<img className="cover rounded-md" src={imgSrc} alt={booking.activity.type} />
				</div>
				<div className="flex flex-col">
					<p className={"font-bold"}>{booking.activity.type}</p>
					<p>{booking.activity.name}</p>
					<p>Pris: {booking.price} kr.</p>
					<p>Dato: {date}</p>
					<p>
						Tid: {timeStart} - {timeEnd}
					</p>
					<div className={"my-3 flex flex-row justify-evenly gap-1"}>
						<Popover>
							<PopoverTrigger>
								<Button size="icon">
									<GoPerson />
								</Button>
							</PopoverTrigger>
							<PopoverContent>
								{booking.participants.map((p, i) => (
									<div className="flex items-center justify-between">
										<p>
											{i + 1}: {p}
										</p>
									</div>
								))}
							</PopoverContent>
						</Popover>
						<Popover>
							<PopoverTrigger>
								<Button size="icon">
									<FaShoppingCart />
								</Button>
							</PopoverTrigger>
							<PopoverContent>
								{booking.products.map((p) => (
									<div className="flex items-center justify-between">
										<img className="w-12" src={p.image} />
										<div>{p.name}</div>
										<div> {p.quantity} stk.</div>
									</div>
								))}
							</PopoverContent>
						</Popover>
					</div>
					<div className={"flex justify-center pt-4"}>
						<Link to={"form"} state={booking}>
							<Button>Rediger</Button>
						</Link>
					</div>
				</div>
			</article>
		</>
	);
}
