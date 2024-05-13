import { IActivity } from "@/models/IActivity";
import { IProduct } from "@/models/IProduct";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { ColumnDef } from "@tanstack/react-table";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

export const ActivityColumns: ColumnDef<IActivity>[] = [
	{
		accessorKey: "id",
		header: "Id",
	},
	{
		accessorKey: "name",
		header: "Navn",
	},
	{
		accessorKey: "price",
		header: "Pris",
	},
	{
		accessorKey: "type",
		header: "Kategori",
	},
	{
		accessorKey: "isOpen",
		header: "Status",
		cell: ({ row }) => {
			const activity = row.original as IActivity;

			const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
                console.log("PATCH: " + event.target.value);
                
                
			};

			return (
				<select  className="p-2 rounded-sm" onChange={handleChange} name="status" id="status">
					<option value="true">Åben</option>
					<option value="false">Lukket</option>
				</select>
			);
		},
	},
];
