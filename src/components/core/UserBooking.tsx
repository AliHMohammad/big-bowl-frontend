import { IBooking } from "@/models/IBooking";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { activityTypeDictionary } from "@/utils/dictionary.ts";
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
			<article className="bg-slate-800 p-8 gap-3 rounded-md flex flex-col w-72 text-white">
				<div className="w-52 mx-auto">
					<img className="cover rounded-md" src={imgSrc} alt={booking.activity.type} />
				</div>
				<div className="flex flex-col text-sm gap-4">
					<div className="text-center">
						<p className={"font-bold text-lg"}>{booking.activity.type}</p>
						<p className="text-sm text-white text-opacity-50 mb-3">{booking.activity.name}</p>
					</div>

					<div className="space-y-2">
						<div className="flex justify-between">
							<p className="font-bold">Pris</p>
							<p>{booking.price.toFixed(2)} kr.</p>
						</div>
						<div className="flex justify-between">
							<p className="font-bold">Dato</p>
							<p>{date}</p>
						</div>
						<div className="flex justify-between">
							<p className="font-bold">Tid</p>
							<p>
								{timeStart} - {timeEnd}
							</p>
						</div>
					</div>

					<div className={"my-5 flex flex-row justify-evenly gap-1"}>
						<Popover>
							<PopoverTrigger>
								<Button className="hover:bg-slate-500" size="icon">
									<GoPerson />
								</Button>
								<div className="text-xs mt-1">Deltagere</div>
							</PopoverTrigger>
							<PopoverContent className="bg-slate-700 border-white shadow-lg shadow-slate-950 space-y-2">
								{booking.participants.map((p, i) => (
									<div key={p} className="flex items-center justify-between text-white">
										<p>Deltager {i + 1}</p>
										<p>{p}</p>
									</div>
								))}
							</PopoverContent>
						</Popover>
						<Popover>
							<PopoverTrigger>
								<Button className="hover:bg-slate-500" size="icon">
									<FaShoppingCart />
								</Button>
								<div className="text-xs mt-1">Tilkøb</div>
							</PopoverTrigger>
							<PopoverContent className="bg-slate-700 border-white shadow-lg shadow-slate-950 space-y-2">
								{booking.products.map((p) => (
									<div key={p.id} className="flex gap-2 justify-between text-white">
										<div className="w-10">
											<img className="h-12 mx-auto" src={p.image} />
										</div>
										<div className="flex justify-between w-full items-center">
											<p>{p.name}</p>
											<p>{p.quantity} stk.</p>
										</div>
									</div>
								))}
							</PopoverContent>
						</Popover>
					</div>
					<div className={"flex justify-center pt-2"}>
						<Link to={"form"} state={booking}>
							<Button className="hover:bg-slate-500">Rediger</Button>
						</Link>
					</div>
				</div>
			</article>
		</>
	);
}
