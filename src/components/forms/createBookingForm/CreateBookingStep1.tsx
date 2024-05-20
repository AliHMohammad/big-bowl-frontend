import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import React from "react";

type Props = {
    setActivityType: (value: string) => void;
    activityType: string;
    setHours: (value: number) => void;
    hours: number | null;
	setDate: (value: Date | undefined) => void;
	date: Date | undefined;
};

export default function CreateBookingStep1({ setActivityType, setDate, setHours, date, activityType, hours }: Props) {
	const fromDate = new Date();

	return (
		<>
			<Select value={activityType} onValueChange={(value) => setActivityType(value)}>
				<SelectTrigger>
					<SelectValue placeholder="Vælg aktivitet" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="Bowling Standard">Bowling Normal</SelectItem>
					<SelectItem value="Bowling Junior">Bowling Junior</SelectItem>
					<SelectItem value="Air Hockey">Air Hockey</SelectItem>
					<SelectItem value="Spisning">Spisning</SelectItem>
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
		</>
	);
}
