import DataTable, { PaginationSize } from "@/components/core/DataTable";
import { IActivity } from "@/models/IActivity";
import { getAllActivities } from "@/services/activitiesApi";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { ActivityColumns } from "@/components/table-columns/ActivityColumns";
import { Button } from "@/components/ui/button";

export default function ActivitiesPage() {
	const [activities, setActivities] = useState<IActivity[] | null>(null);
    const [pagination, setPagination] = useState<PaginationSize>({
		pageIndex: 0, //initial page index
		pageSize: 5, //default page size
    });
    const [sort, setSort] = useState({
		sortBy: "id",
		sortDir: "ASC"
	});
    const [filter, setFilter] = useState("");
    
    useEffect(() => {
		const queryParams = new URLSearchParams({
			pageIndex: String(pagination.pageIndex),
			pageSize: String(pagination.pageSize),
			...sort
		})

		if (filter != "none")
			queryParams.append("filterBy", filter)
		
        
		console.log(queryParams);
		

		getAllActivities()
			.then(({ data }) => setActivities(data))
			.catch(() => {
				toast({
					title: "Åh nej! Noget gik galt!",
					description: `Kunne ikke finde aktiviteterne i systemet. Prøv igen på et senere tidspunkt.`,
					variant: "destructive",
				});
			});
	}, [pagination, sort, filter]);



	console.log(activities);

	return (
		<div>
			<div>Activities Page</div>
            {activities && <DataTable columns={ActivityColumns} data={activities} pagination={pagination} />}
            
		</div>
	);
}
