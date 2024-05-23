import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import React from "react";

type Props = {
	activityType: string;
	hours: number | null;
	date: Date | undefined;
	setActivityType: (value: string) => void;
	setHours: (value: number) => void;
	setDate: (value: Date | undefined) => void;
	setStep: React.Dispatch<React.SetStateAction<number>>;
};

export default function CreateBookingStep1({ setActivityType, setDate, setHours, date, activityType, hours, setStep }: Props) {
	const fromDate = new Date();

	const stepOneNext = Boolean(date && activityType && hours !== null);

	return (
		<>
			<Select value={activityType} onValueChange={(value) => setActivityType(value)}>
				<SelectTrigger>
					<SelectValue placeholder="Vælg aktivitet" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="Bowling Standard">Bowling Standard - 200 kr.</SelectItem>
					<SelectItem value="Bowling Junior">Bowling Junior - 100 kr.</SelectItem>
					<SelectItem value="Air Hockey">Air Hockey - 150 kr.</SelectItem>
					<SelectItem value="Spisning">Spisning - 50 kr.</SelectItem>
				</SelectContent>
			</Select>

			<Calendar
				mode="single"
				captionLayout="dropdown-buttons"
				fromDate={fromDate}
				selected={date}
				onSelect={setDate}
				className="rounded-md border bg-white"
				initialFocus
				showOutsideDays
				fixedWeeks
			/>

			<Select value={hours ? String(hours) : ""} onValueChange={(value) => setHours(Number(value))}>
				<SelectTrigger>
					<SelectValue placeholder="Vælg tid" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="1">1 time</SelectItem>
					<SelectItem value="2">2 timer</SelectItem>
				</SelectContent>
			</Select>

			<div className="flex justify-between">
				<Button disabled={true} onClick={() => setStep((prev) => prev - 1)}>
					Forrige
				</Button>
				<Button disabled={!stepOneNext} onClick={() => setStep((prev) => prev + 1)}>
					Næste
				</Button>
			</div>
		</>
	);
}
