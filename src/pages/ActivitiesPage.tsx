import DataTable, { PaginationSize } from "@/components/table/DataTable.tsx";
import { IActivity } from "@/models/IActivity";
import { getAllActivities } from "@/services/activitiesApi";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { ActivityColumns } from "@/components/table/table-columns/ActivityColumns";
import { Button } from "@/components/ui/button";
import { IPagination } from "@/models/IPagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

export default function ActivitiesPage() {
	const [activities, setActivities] = useState<IPagination<IActivity> | null>(null);
	const [pagination, setPagination] = useState<PaginationSize>({
		pageIndex: 0, //initial page index
		pageSize: 5, //default page size
	});
	const [sort, setSort] = useState({
		sortBy: "id",
		sortDir: "ASC",
	});
	const [filter, setFilter] = useState("");

	useEffect(() => {
		const queryParams = new URLSearchParams({
			pageIndex: String(pagination.pageIndex),
			pageSize: String(pagination.pageSize),
			...sort,
		});

		if (filter != "none")
			queryParams.append("filterBy", filter);


		console.log(queryParams);


		getAllActivities(queryParams.toString())
			.then(({ data }) => setActivities(data))
			.catch(() => {
				toast({
					title: "Åh nej! Noget gik galt!",
					description: `Kunne ikke finde aktiviteterne i systemet. Prøv igen på et senere tidspunkt.`,
					variant: "destructive",
				});
			});
	}, [pagination, sort, filter]);


	return (
		<div className="flex flex-col gap-4">
			<h2 className="text-white text-3xl sm:text-5xl font-bold text-center text-pretty mb-5">Aktiviteter</h2>
			<div className="flex justify-between">
				<div className="flex gap-2 flex-wrap">
					<Select
						onValueChange={(value) => {
							setPagination((prevState) => ({ ...prevState, pageIndex: 0 }));
							setSort((prevState) => ({ ...prevState, sortBy: value }));
						}}
					>
						<SelectTrigger className="w-[140px]">
							<SelectValue placeholder="Sorter efter" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="id">ID</SelectItem>
							<SelectItem value="name">Navn</SelectItem>
							<SelectItem value="isOpen">Status</SelectItem>
						</SelectContent>
					</Select>

					<Select
						defaultValue="ASC"
						onValueChange={(value) => {
							setPagination((prevState) => ({ ...prevState, pageIndex: 0 }));
							setSort((prevState) => ({ ...prevState, sortDir: value }));
						}}
					>
						<SelectTrigger className="w-[120px]">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="ASC">Stigende</SelectItem>
							<SelectItem value="DESC">Faldende</SelectItem>
						</SelectContent>
					</Select>

					<Select
						onValueChange={(value) => {
							setPagination((prevState) => ({ ...prevState, pageIndex: 0 }));
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
				</div>
			</div>
			{activities &&
				<motion.div
					key={pagination.pageIndex + sort.sortBy + sort.sortDir + filter}
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: 1,
					}}
				>
					<DataTable columns={ActivityColumns} data={activities.content} pagination={pagination} />
				</motion.div>}
			<div className="flex justify-evenly">
				<Button className="hover:bg-slate-500"
						onClick={() => setPagination((prevState) => ({
							...prevState,
							pageIndex: prevState.pageIndex - 1,
						}))}
						disabled={activities?.first}>
					{"Forrige"}
				</Button>
				{activities?.totalPages ? (
					<p className="text-white">
						{" "}
						Side {pagination.pageIndex + 1} / {activities?.totalPages}{" "}
					</p>
				) : null}
				<Button className="hover:bg-slate-500"
						onClick={() => setPagination((prevState) => ({
							...prevState,
							pageIndex: prevState.pageIndex + 1,
						}))}
						disabled={activities?.last}>
					{"Næste"}
				</Button>
			</div>
		</div>
	);
}
