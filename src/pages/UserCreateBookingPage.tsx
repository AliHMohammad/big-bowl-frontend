import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mobiscroll/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import CreateBookingStep1 from "@/components/forms/createBookingForm/CreateBookingStep1";

const IProductBookingRequestSchema = z.object({
	id: z.number(),
	quantity: z.number(),
});

const formSchema = z.object({
	start: z.date(),
	end: z.date(),
	userId: z.string(),
	activityId: z.number(),
	participants: z.array(z.string()),
	products: z.array(IProductBookingRequestSchema),
});

type IBookingRequest = {
	start: Date;
	end: Date;
	userId: string;
	activityId: number;
	participants: string[];
	products: IProductBookingRequest[];
};

type IProductBookingRequest = {
	id: number;
	quantity: number;
};

const timeBlocks = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];

export default function UserCreateBookingPage() {
	const [date, setDate] = useState<Date>();
	const [step, setStep] = useState(1);
	const [activityType, setActivityType] = useState("");
	const [hours, setHours] = useState<number | null>(null);

	console.log(step);
	console.log(date);
	console.log(activityType);
	console.log(hours);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};

	return (
		<>
			<h2 className="flex justify-center text-4xl text-white font-semibold mb-10">Opret Booking</h2>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4 flex flex-col items-center">
					<div className="flex justify-center flex-col gap-5">
						{step === 1 && (
							<CreateBookingStep1
								setActivityType={setActivityType}
								setDate={setDate}
								setHours={setHours}
								date={date}
								activityType={activityType}
                                hours={hours}
							/>
						)}
					</div>
					<Button type="submit">Opret booking</Button>
				</form>
			</Form>

			{step === 2 && <div>Step 2 input</div>}
			{step === 3 && <div>Step 3 input</div>}
			{step === 4 && <div>Step 4 input</div>}

			<div>
				<Button disabled={step == 1} onClick={() => setStep((prev) => prev - 1)}>
					Forrige
				</Button>
				<Button disabled={step == 4} onClick={() => setStep((prev) => prev + 1)}>
					Næste
				</Button>
			</div>
		</>
	);
}
