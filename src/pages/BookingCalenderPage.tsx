import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, MbscCalendarEvent, MbscEventcalendarView, setOptions } from "@mobiscroll/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useMemo, useState } from "react";
import { IActivity } from "@/models/IActivity";
import { getAllActivitiesCalender } from "@/services/activitiesApi";
import { toast } from "@/components/ui/use-toast";
import { getAllBookings } from "@/services/bookingApi";
import { IBooking } from "@/models/IBooking";

setOptions({
	theme: "windows",
	themeVariant: "dark",
});

interface BookingCalender extends IBooking {
	resource: number;
	title: string;
}

interface ActivityCalender extends IActivity {
	background: string;
}

type Timeline = "day" | "week" | "month" | "year" | undefined;

export default function BookingCalenderPage() {
	const [bookings, setBookings] = useState<BookingCalender[] | null>(null);
	const [activities, setActivities] = useState<ActivityCalender[] | null>(null);
	const [filter, setFilter] = useState<string>("");
	const [timeline, setTimeline] = useState<Timeline>("day");

	const myView = useMemo<MbscEventcalendarView>(
		() => ({
			timeline: {
				type: timeline,
				startTime: "10:00",
				endTime: "22:00",
			},
		}),
		[timeline],
	);

	useEffect(() => {
		const queryParams = new URLSearchParams();

		if (filter != "none") queryParams.append("filterBy", filter);

		getAllActivitiesCalender(queryParams.toString())
			.then(({ data }) => {
				const result = data.map((a) => ({
					...a,
					background: a.isOpen ? "" : "maroon",
				}));
				setActivities(result);
			})
			.catch(() => {
				toast({
					title: "Åh nej! Noget gik galt!",
					description: `Kunne ikke finde aktiviterne i systemet. Prøv igen på et senere tidspunkt.`,
					variant: "destructive",
				});
			});
	}, [filter]);

	useEffect(() => {
		getAllBookings()
			.then(({ data }) => {
				const result = data.map((b) => {
					return {
						...b,
						title: `${b.user.firstName} ${b.user.lastName}, ${b.participants.length} deltagere`,
						resource: b.activity.id,
					} as BookingCalender;
				});

				setBookings(result);
			})
			.catch(() => {
				toast({
					title: "Åh nej! Noget gik galt!",
					description: `Kunne ikke finde bookingerne i systemet. Prøv igen på et senere tidspunkt.`,
					variant: "destructive",
				});
			});
	}, []);

	return (
		<div className="flex flex-col gap-4">
			<h2 className="text-white text-3xl sm:text-5xl font-bold text-center text-pretty mb-5">Kalender</h2>
			<div className="flex flex-row flex-wrap justify-between">
				<Select
					onValueChange={(value) => {
						setFilter(value);
					}}
				>
					<SelectTrigger className="w-[160px]">
						<SelectValue placeholder="Filtrer efter" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="none">Ingen</SelectItem>
						<SelectItem value="Bowling Voksen">Bowling Voksen</SelectItem>
						<SelectItem value="Bowling Junior">Bowling Junior</SelectItem>
						<SelectItem value="Air Hockey">Air Hockey</SelectItem>
						<SelectItem value="Spisning">Spisning</SelectItem>
					</SelectContent>
				</Select>
				<Select
					onValueChange={(value) => {
						setTimeline(value as Timeline);
					}}
					defaultValue={"day"}
				>
					<SelectTrigger className="w-[160px]">
						<SelectValue placeholder="Tidslinje" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="day">Dag</SelectItem>
						<SelectItem value="week">Uge</SelectItem>
						<SelectItem value="month">Måned</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div>
				<Eventcalendar
					clickToCreate={false}
					dragToCreate={false}
					dragToMove={false}
					dragToResize={false}
					eventDelete={false}
					view={myView}
					data={bookings as MbscCalendarEvent[]}
					resources={activities}
				/>
			</div>
		</div>
	);
}
