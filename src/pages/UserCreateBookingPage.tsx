import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { formSchema } from "@/components/forms/createBookingForm/schema";
import CreateBookingStep1 from "@/components/forms/createBookingForm/CreateBookingStep1";
import CreateBookingStep2 from "@/components/forms/createBookingForm/CreateBookingStep2";
import CreateBookingStep3 from "@/components/forms/createBookingForm/CreateBookingStep3";
import { IProduct } from "@/models/IProduct";
import { useUser } from "@clerk/clerk-react";
import CreateBookingStep4 from "@/components/forms/createBookingForm/CreateBookingStep4.tsx";
import { IActivity } from "@/models/IActivity.ts";
import { createBooking } from "@/services/bookingApi.ts";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import StepIndicator from "@/components/forms/createBookingForm/stepIndicator/StepIndicator";
import Step from "@/components/forms/createBookingForm/stepIndicator/Step";
import { motion } from "framer-motion";

export type IBookingRequest = {
	start: string;
	duration: number;
	userId: string;
	activityId: number;
	participants: string[];
	products: IProductRequest[];
};

export interface IProductQuantity extends IProduct {
	quantity: number;
}

type IProductRequest = {
	id: number;
	quantity: number;
};

export default function UserCreateBookingPage() {
	const navigate = useNavigate();
	const [date, setDate] = useState<Date>();
	const [step, setStep] = useState(1);
	const [prevStep, setPrevStep] = useState(1);
	const [activityType, setActivityType] = useState("");
	const [hours, setHours] = useState<number | null>(null);
	const [selectedProducts, setSelectedProducts] = useState<IProductQuantity[]>([]);
	const [activity, setActivity] = useState<IActivity | null>(null);

	const { user } = useUser();

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

	// Used for x-translate animation
	const prevStepRef = useRef(step);
	const delta = step - prevStep;

	useEffect(() => {
		// Update the ref to the current step before updating the state
		prevStepRef.current = step;
		setPrevStep(prevStepRef.current);
	}, [step]);

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		const productRequests = selectedProducts.map((p) => {
			return {
				id: p.id,
				quantity: p.quantity,
			} as IProductRequest;
		});

		const { name1, name2, name3, name4 } = values;
		const arr = [name1, name2, name3, name4];
		const participants: string[] = arr.filter((name) => name !== "");

		const request: IBookingRequest = {
			start: date!.toISOString(),
			activityId: activity!.id,
			userId: user!.id,
			duration: hours!,
			participants: participants,
			products: productRequests,
		};

		createBooking(request)
			.then(({ data }) => {
				toast({
					title: "Reservation oprettet!",
					description: `Din reservation er oprettet med reservations ID: ${data.id}`,
				});
				navigate("/reservations");
			})
			.catch(() => {
				toast({
					title: "Åh nej! Noget gik galt!",
					description: `Kunne ikke oprette din reservation i vores system. Prøv igen på et senere tidspunkt.`,
					variant: "destructive",
				});
			});
	};

	return (
		<>
			<h2 className="flex justify-center text-4xl text-white font-semibold mb-5">Opret Reservation</h2>
			<StepIndicator>
				<Step step={step} highlightAt={1}>
					Aktivitet og Dato
				</Step>
				<Step step={step} highlightAt={2}>
					Tidspunkt og Deltagere
				</Step>
				<Step step={step} highlightAt={3}>
					Tilkøb
				</Step>
				<Step step={step} highlightAt={4}>
					Samlet oversigt
				</Step>
			</StepIndicator>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4 flex flex-col items-center">
					<motion.div
						className="flex justify-center flex-col gap-5"
						key={step}
						initial={{
							opacity: 0,
							x: delta >= 0 ? 50 : -50,
						}}
						animate={{
							opacity: 1,
							x: 0,
						}}
						transition={{
							duration: 0.3,
							ease: "easeInOut",
						}}
					>
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
						{step === 2 && (
							<CreateBookingStep2
								activityType={activityType}
								date={date!}
								form={form}
								setStep={setStep}
								activity={activity}
								setActivity={setActivity}
							/>
						)}
						{step === 3 && <CreateBookingStep3 setStep={setStep} setSelectedProducts={setSelectedProducts} selectedProducts={selectedProducts} />}
						{step === 4 && (
							<CreateBookingStep4
								activity={activity!}
								activityType={activityType}
								date={date!}
								hours={hours!}
								products={selectedProducts}
								setStep={setStep}
								form={form}
							/>
						)}
					</motion.div>
				</form>
			</Form>
		</>
	);
}
