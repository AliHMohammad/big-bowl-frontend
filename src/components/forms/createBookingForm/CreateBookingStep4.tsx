import { IActivity } from "@/models/IActivity.ts";
import { IProductQuantity } from "@/pages/UserCreateBookingPage.tsx";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { GoPerson } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/components/forms/createBookingForm/schema.ts";
import { format } from "date-fns";
import { da } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { activityTypeDictionary } from "@/utils/dictionary";

type Props = {
	activityType: string;
	activity: IActivity;
	date: Date;
	hours: number;
	products: IProductQuantity[];
	setStep: React.Dispatch<React.SetStateAction<number>>;
	form: UseFormReturn<z.infer<typeof formSchema>>;
};

export default function CreateBookingStep4({ activityType, activity, date, hours, products, setStep, form }: Props) {
	const { startTime, name1, name2, name3, name4 } = form.getValues();
	const arr = [name1, name2, name3, name4];
	const participants: string[] = arr.filter((name) => name !== "");
	const [hour, minute] = startTime.split(":").map(Number);
	date.setHours(hour, minute);
	const formattedDate = format(date, "dd MMMM, yyyy, p", { locale: da });
	const PRODUCTS_TOTAL_PRICE = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
	const TOTAL_PRICE = (PRODUCTS_TOTAL_PRICE + activity.price).toFixed(2);
	const imgSrc = activityTypeDictionary[activity.type];
	console.log(activity.type);

	return (
		<>
			<div className="bg-slate-800 w-96 rounded-lg p-3 text-white">
				<div className={"flex flex-col gap-3 p-2"}>
					<div className="w-72 flex justify-center mx-auto my-5 h-44">
						<img className="rounded-md object-cover" src={imgSrc} alt={activity.type} />
					</div>
					<div>
						{formattedDate}, {hours} {hours > 1 ? "timer" : "time"}
					</div>
					<div className="flex justify-between items-center">
						<p>
							{activityType} - <span className="text-xs text-white text-opacity-50">{activity.name}</span>
						</p>
						<p>{activity.price.toFixed(2)} kr.</p>
					</div>
					<div className="flex justify-between">
						<p>Tilkøb</p>
						<p>{PRODUCTS_TOTAL_PRICE.toFixed(2)} kr.</p>
					</div>
					<div className="flex justify-between border-t border-orange-300 py-2 font-bold">
						<p>Samlet Pris</p>
						<p>{TOTAL_PRICE} kr.</p>
					</div>
				</div>

				<div className={"my-3 flex flex-row justify-evenly gap-1"}>
					<Popover>
						<PopoverTrigger>
							<Button type={"button"} size="icon">
								<GoPerson />
							</Button>
							<div className="text-xs mt-1">Deltagere</div>
						</PopoverTrigger>
						<PopoverContent className="bg-slate-700 border-white shadow-lg shadow-slate-950 space-y-2">
							{participants.map((p, i) => (
								<div key={p} className="flex items-center justify-between text-white">
									<p>Deltager {i + 1}</p>
									<p>{p}</p>
								</div>
							))}
						</PopoverContent>
					</Popover>
					<Popover>
						<PopoverTrigger>
							<Button type={"button"} size="icon">
								<FaShoppingCart />
							</Button>
							<div className="text-xs mt-1">Tilkøb</div>
						</PopoverTrigger>
						<PopoverContent className="bg-slate-700 border-white shadow-lg shadow-slate-950 space-y-2">
							{products.map((p) => (
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
			</div>

			<div className="flex justify-between">
				<Button type={"button"} onClick={() => setStep((prev) => prev - 1)}>
					Forrige
				</Button>
				<Button type="submit">Opret Reservation</Button>
			</div>
		</>
	);
}
