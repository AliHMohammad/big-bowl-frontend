import { IActivity } from "@/models/IActivity"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateStatusOnActivity } from "@/services/activitiesApi";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";


const formSchema = z.object({
	isOpen: z.boolean()
});


type Props = {
    activity: IActivity
}

export default function ActivityForm({activity}: Props) {
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			isOpen: activity.isOpen
		},
    });
    
    const onSubmit = ({isOpen}: z.infer<typeof formSchema>) => {
        
        updateStatusOnActivity(activity.id, isOpen)
			.then(() => {
				toast({
					title: "Aktivitet opdateret!",
					description: `Vi har opdateret ${activity.name} til ${isOpen ? "åben" : "lukket"} i systemet.`,
				});
				navigate("/administration/activities");
				return;
			})
			.catch(() => {
				toast({
					title: "Åh nej! Noget gik galt!",
					description: `Kunne ikke opdatere aktiviteten i systemet. Prøv igen på et senere tidspunkt.`,
					variant: "destructive",
				});
			});
    }



    return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="isOpen"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Status</FormLabel>
								<FormControl>
									<Select onValueChange={value => field.onChange(value === "true")} defaultValue={String(field.value)}>
										<SelectTrigger className="">
											<SelectValue placeholder="Vælg status" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectItem {...field} value={"true"}>
													{"Åben"}
												</SelectItem>
												<SelectItem {...field} value={"false"}>
													{"Lukket"}
												</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit">Opdater</Button>
				</form>
			</Form>
		</>
	);
}