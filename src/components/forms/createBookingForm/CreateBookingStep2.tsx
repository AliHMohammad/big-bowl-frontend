import { getOccupiedBookingTimes } from "@/services/bookingApi";
import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IActivity } from "@/models/IActivity";
import { getAllActivitiesByType } from "@/services/activitiesApi";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { formSchema } from "@/components/forms/createBookingForm/schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input.tsx";

type Props = {
	activityType: string;
	date: Date;
	form: UseFormReturn<z.infer<typeof formSchema>>;
	setStep: React.Dispatch<React.SetStateAction<number>>;
	activity: IActivity | null,
	setActivity: React.Dispatch<React.SetStateAction<IActivity | null>>
};

export type OccupiedTimesResponse = {
	duration: number;
	startTime: string;
};
const TIMEBLOCK = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];

export default function CreateBookingStep2({ activityType, date, form, setStep, setActivity, activity }: Props) {
	const [timeblock, setTimeblock] = useState<string[]>([]);
	const [activities, setActivities] = useState<IActivity[] | null>(null);
	const [startTime, setStartTime] = useState("");
	const stepTwoNext = Boolean(startTime && activity);

	useEffect(() => {
		getAllActivitiesByType(activityType)
			.then((r) => setActivities(r.data))
			.catch(() => {
				console.log("fetch error");
			});
	}, [activityType]);

	useEffect(() => {
		if (!activity) return;
		console.log("FETCH");
		getOccupiedBookingTimes(activity.id, date)
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
	}, [activity, date, form]);

	console.log(activity?.id);

	return (
		<>
			<FormField

				control={form.control}
				name="activityId"
				render={({ field }) => (
					<>
						<FormLabel className="text-white">Sted</FormLabel>
						<Select
							onValueChange={(v) => {
								field.onChange(Number(v));
								const foundActivity = activities?.find((p) => p.id == Number(v));
								setActivity(foundActivity!);
							}}
							/*defaultValue={String(field.value)}*/
							defaultValue={"Hello world"}
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
					</>
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
						disabled={!activity}
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

			<FormField
				control={form.control}
				name="name1"
				render={({ field }) => (
					<FormItem>
						<FormLabel className="text-white">Deltagere</FormLabel>
						<FormControl>
							<Input placeholder="Deltager 1" disabled={true} required {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="name2"
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input placeholder="Deltager 2" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="name3"
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input placeholder="Deltager 3" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="name4"
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input placeholder="Deltager 4" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
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
