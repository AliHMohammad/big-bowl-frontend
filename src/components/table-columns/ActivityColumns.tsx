import { IActivity } from "@/models/IActivity";
import { updateStatusOnActivity } from "@/services/activitiesApi";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
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

			return (
				<p>{activity.isOpen ? "Åben" : "Lukket"}</p>
			);
		},
	},
	{
		accessorKey: "edit",
		header: "Rediger",
		cell: ({ row }) => {
			const activity = row.original as IActivity;

			return (
				<div className="flex justify-center items-center hover:text-red-400 transition-all">
					<Link to={"form"} state={activity}>
						<FaRegEdit size={22} />
					</Link>
				</div>
			);
		},
	},
];