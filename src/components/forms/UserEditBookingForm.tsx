import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { IBooking } from "@/models/IBooking";
import { deleteBooking, updateBookingParticipants } from "@/services/bookingApi";

const formSchema = z.object({
	name1: z.string().min(0).max(50),
	name2: z.string().min(0).max(50),
	name3: z.string().min(0).max(50),
	name4: z.string().min(0).max(50),
});

export type productRequest = {
	id?: number;
	name: string;
	image: string;
	price: number;
	stock: number;
	category: string;
};

type Props = {
	booking: IBooking;
};

export default function UserEditBookingForm({ booking }: Props) {
	const navigate = useNavigate();


	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name1: booking.participants[0] || "",
			name2: booking.participants[1] || "",
			name3: booking.participants[2] || "",
			name4: booking.participants[3] || "",
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);

		const names = [];

		for (const [key, value] of Object.entries(values)) {
			if (value) names.push(value);
		}

		console.log(names);

		updateBookingParticipants(booking.id, names)
			.then(() => navigate("/reservations"))
			.catch(() => {
				toast({
					title: "Åh nej! Noget gik galt!",
					description: `Kunne ikke opdatere din booking i systemet. Prøv igen på et senere tidspunkt.`,
					variant: "destructive",
				});
			});
	};

	const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		deleteBooking(booking.id)
			.then(() => {
				toast({
					title: "Reservation slettet",
					description: `Din reservation med ID nr. ${booking.id} er blevet slettet i vores system. Håber vi ses igen!`,
				});
				navigate("/reservations");
			})
			.catch(() => {
				toast({
					title: "Åh nej! Noget gik galt!",
					description: `Kunne ikke slette din booking i systemet. Tag kontakt til os eller prøv igen på et senere tidspunkt.`,
					variant: "destructive",
				});
			});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-60">
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

				<div className="flex justify-center gap-3">
					<Button type="submit">Opdater</Button>
					<Button variant={"destructive"} onClick={handleDelete}>
						Slet
					</Button>
				</div>
			</form>
		</Form>
	);
}
