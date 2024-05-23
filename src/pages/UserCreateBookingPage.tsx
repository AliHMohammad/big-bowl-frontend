import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mobiscroll/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { formSchema } from "@/components/forms/createBookingForm/schema";
import CreateBookingStep1 from "@/components/forms/createBookingForm/CreateBookingStep1";
import CreateBookingStep2 from "@/components/forms/createBookingForm/CreateBookingStep2";
import CreateBookingStep3 from "@/components/forms/createBookingForm/CreateBookingStep3";
import { IProduct } from "@/models/IProduct";
import { useUser } from "@clerk/clerk-react";

export type IBookingRequest = {
	start: Date;
	duration: number;
	userId: string;
	activityId: number;
	participants: string[];
	products: IProductBookingRequest[];
};

export interface IProductBookingRequest extends IProduct {
	quantity: number;
}

export type IBookingTimeRequest = {
	date: Date;
	activityType: string;
	hours: number;
};

export default function UserCreateBookingPage() {
	const [date, setDate] = useState<Date>();
	const [step, setStep] = useState(1);
	const [activityType, setActivityType] = useState("");
	const [hours, setHours] = useState<number | null>(null);
	const [selectedProducts, setSelectedProducts] = useState<IProductBookingRequest[]>([]);
	const [activityId, setActivityId] = useState<number | null>(null);

	const {user} = useUser();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			startTime: "",
			activityId: 0,
			name1: user?.firstName || "John Doe",
			name2: "",
			name3: "",
			name4: "",
		},
	});


	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log("SUBMIT");
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
								setStep={setStep}
							/>
						)}

						{step === 2 && <CreateBookingStep2 activityType={activityType} date={date!} form={form} setStep={setStep} activityId={activityId} setActivityId={setActivityId} />}

						{step === 3 && <CreateBookingStep3 setStep={setStep} setSelectedProducts={setSelectedProducts} selectedProducts={selectedProducts} />}
					</div>

					<Button type="submit">Opret booking</Button>
				</form>
			</Form>

			{step === 4 && <div>Step 4 input</div>}
		</>
	);
}
