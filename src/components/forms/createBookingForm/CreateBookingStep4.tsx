import { IActivity } from "@/models/IActivity.ts";
import { IProductQuantity } from "@/pages/UserCreateBookingPage.tsx";
import { Button } from "@mobiscroll/react";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { GoPerson } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/components/forms/createBookingForm/schema.ts";
import { format } from "date-fns";
import { da } from "date-fns/locale";

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
	const TOTAL_PRICE = PRODUCTS_TOTAL_PRICE + activity.price;

	return (
		<>
			<div className="bg-orange-300 w-96 rounded-md">
				<div className={"p-2"}>
					<p>
						{activityType} - {activity.name} - {activity.price} kr.
					</p>
					<p>{formattedDate}</p>
					<p>
						{hours} {hours > 1 ? "timer" : "time"}
					</p>
					<p>Produkter - {PRODUCTS_TOTAL_PRICE} kr.</p>
					<p>Samlet Pris - {TOTAL_PRICE} kr.</p>

				</div>

				<div className={"my-3 flex flex-row justify-evenly gap-1"}>
					<Popover>
						<PopoverTrigger>
							<Button type={"button"} size="icon">
								<GoPerson />
							</Button>
						</PopoverTrigger>
						<PopoverContent>
							{participants.map((p, i) => (
								<div key={p} className="flex items-center justify-between">
									<p>
										{i + 1}: {p}
									</p>
								</div>
							))}
						</PopoverContent>
					</Popover>
					<Popover>
						<PopoverTrigger>
							<Button type={"button"} size="icon">
								<FaShoppingCart />
							</Button>
						</PopoverTrigger>
						<PopoverContent>
							{products.map((p) => (
								<div key={p.id} className="flex items-center justify-between">
									<img className="w-12" src={p.image} />
									<div>{p.name}</div>
									<div> {p.quantity} stk.</div>
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
				<Button type="submit">Opret booking</Button>
			</div>
		</>
	);
}
