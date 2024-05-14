import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, MbscCalendarEvent, MbscEventcalendarView, setOptions } from "@mobiscroll/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useMemo, useState } from "react";
import { IActivity } from "@/models/IActivity";
import { getAllActivitiesCalender } from "@/services/activitiesApi";
import { toast } from "@/components/ui/use-toast";
import { getAllBookings } from "@/services/bookingApi";
import { IBooking } from "@/models/IBooking";
import { Label } from "@/components/ui/label";

setOptions({
	theme: "ios",
	themeVariant: "light",
});

interface BookingCalender extends IBooking {
	resource: number;
	title: string;
}

interface ActivityCalender extends IActivity {
	background: string;
}

export default function BookingCalenderPage() {
	const [bookings, setBookings] = useState<BookingCalender[] | null>(null);
	const [activities, setActivities] = useState<ActivityCalender[] | null>(null);
	const [filter, setFilter] = useState<string>("");

	const myView = useMemo<MbscEventcalendarView>(
		() => ({
			timeline: {
				type: "day",
			},
		}),
		[],
	);

	useEffect(() => {
		const queryParams = new URLSearchParams();

		if (filter != "none") queryParams.append("filterBy", filter);

		getAllActivitiesCalender(queryParams.toString())
			.then(({ data }) => {
				const result = data.map((a) => ({
					...a,
					background: a.isOpen ? "" : "red",
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
			<div>
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
						<SelectItem value="Bowling Standard">Bowling Normal</SelectItem>
						<SelectItem value="Bowling Junior">Bowling Junior</SelectItem>
						<SelectItem value="Air Hockey">Air Hockey</SelectItem>
						<SelectItem value="Spisning">Spisning</SelectItem>
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
