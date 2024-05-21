import { getOccupiedBookingTimes } from "@/services/bookingApi";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IActivity } from "@/models/IActivity";
import { getAllActivitiesByType } from "@/services/activitiesApi";
import { UseFormReturn } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import { formSchema } from "@/components/forms/createBookingForm/schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";

type Props = {
	activityType: string;
	date: Date;
	form: UseFormReturn<z.infer<typeof formSchema>>;
	setStep: React.Dispatch<React.SetStateAction<number>>;
};

export type OccupiedTimesResponse = {
	duration: number;
	startTime: string;
};
const TIMEBLOCK = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];

export default function CreateBookingStep2({ activityType, date, form, setStep }: Props) {
	const [timeblock, setTimeblock] = useState<string[]>([]);
	const [activities, setActivities] = useState<IActivity[] | null>(null);
	const [activityId, setActivityId] = useState<number | null>(null);
	const [startTime, setStartTime] = useState("");

	const stepTwoNext = Boolean(startTime && activityId);

	useEffect(() => {
		getAllActivitiesByType(activityType)
			.then((r) => setActivities(r.data))
			.catch(() => {
				console.log("fetch error");
			});
	}, [activityType]);

	useEffect(() => {
		if (!activityId) return;

		getOccupiedBookingTimes(activityId, date)
			.then((r) => {
				const newTimeblock = [...TIMEBLOCK];
				for (const item of r.data) {
					console.log(item);
					const index = newTimeblock.findIndex((i) => i == item.startTime);
					newTimeblock.splice(index, item.duration);
				}
				form.resetField("startTime");
				setTimeblock(newTimeblock);
			})
			.catch(() => {
				console.log("fetch error");
			});
	}, [activityId, date, form]);

	return (
		<>
			<FormField
				control={form.control}
				name="activityId"
				render={({ field }) => (
					<Select
						onValueChange={(v) => {
							field.onChange(Number(v));
							setActivityId(Number(v));
						}}
						defaultValue={String(field.value)}
					>
						<SelectTrigger>
							<SelectValue placeholder="Vælg aktivitet" />
						</SelectTrigger>
						<SelectContent>
							{activities?.map((activity) => {
								return (
									<SelectItem key={activity.id} value={String(activity.id)}>
										{activity.name}
									</SelectItem>
								);
							})}
						</SelectContent>
					</Select>
				)}
			/>

			<FormField
				control={form.control}
				name="startTime"
				render={({ field }) => (
					<Select
						value={field.value}
						onValueChange={(v) => {
							field.onChange(v);
							setStartTime(v);
						}}
						defaultValue={field.value}
						disabled={!activityId}
					>
						<SelectTrigger>
							<SelectValue placeholder="Vælg start tid" />
						</SelectTrigger>
						<SelectContent>
							{timeblock.map((time) => {
								return (
									<SelectItem key={time} value={time}>
										{time}
									</SelectItem>
								);
							})}
						</SelectContent>
					</Select>
				)}
			/>

			<div className="flex justify-between">
				<Button onClick={() => setStep((prev) => prev - 1)}>Forrige</Button>
				<Button disabled={!stepTwoNext} onClick={() => setStep((prev) => prev + 1)}>
					Næste
				</Button>
			</div>
		</>
	);
}
