import DataTable from "@/components/core/DataTable";
import { IActivity } from "@/models/IActivity";
import { getAllActivities } from "@/services/activitiesApi";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

export default function ActivitiesPage() {
	const [activities, setActivities] = useState<IActivity | null>(null);

	useEffect(() => {
		getAllActivities()
			.then(({ data }) => setActivities(data))
			.catch(() => {
				toast({
					title: "Åh nej! Noget gik galt!",
					description: `Kunne ikke finde aktiviteterne i systemet. Prøv igen på et senere tidspunkt.`,
					variant: "destructive",
				});
			});
	}, []);

	console.log(activities);

	return (
		<div>
			<div>Activities Page</div>
			{/* <DataTable columns={} data={}/> */}
		</div>
	);
}
