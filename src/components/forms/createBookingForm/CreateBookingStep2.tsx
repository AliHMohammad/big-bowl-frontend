import { getAvailableBookingTimes } from "@/services/bookingApi";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IActivity } from "@/models/IActivity";
import { getAllActivitiesByType } from "@/services/activitiesApi";
import { UseFormReturn } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { formSchema } from "@/components/forms/createBookingForm/schema";
import { z } from "zod";

type Props = {
	activityType: string;
	hours: number;
	date: Date;
	form: UseFormReturn<z.infer<typeof formSchema>>;
};

export type OccupiedTimesResponse = {
	duration: number;
	startTime: string;
};
const TIMEBLOCK = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];

export default function CreateBookingStep2({ activityType, date, hours, form }: Props) {
	const [timeblock, setTimeblock] = useState<string[]>([]);
	const [activities, setActivities] = useState<IActivity[] | null>(null);
	const [activityId, setActivityId] = useState<number | null>(null);

	useEffect(() => {
		getAllActivitiesByType(activityType)
			.then((r) => setActivities(r.data))
			.catch(() => {
				console.log("fetch error");
			});
	}, [activityType]);

	useEffect(() => {
		if (!activityId) return;

		getAvailableBookingTimes(activityId, date)
			.then((r) => {
				const newTimeblock = [...TIMEBLOCK];
				for (const item of r.data) {
					console.log(item);
					const index = newTimeblock.findIndex((i) => i == item.startTime);
					newTimeblock.splice(index, item.duration);
				}
				setTimeblock(newTimeblock);
			})
			.catch(() => {
				console.log("fetch error");
			});
	}, [activityId, date, hours]);

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
			{activityId && (
				<FormField
					control={form.control}
					name="startTime"
					render={({ field }) => (
						<Select
							onValueChange={(v) => {
								field.onChange(v);
							}}
							defaultValue={field.value}
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
			)}
		</>
	);
}
