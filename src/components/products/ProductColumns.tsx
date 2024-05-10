import { IProduct } from "@/models/IProduct";
import { ColumnDef } from "@tanstack/react-table";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

export const ProductColumns: ColumnDef<IProduct>[] = [
	{
		accessorKey: "id",
		header: "Id",
	},
	{
		accessorKey: "image",
		header: "Billede",
		cell: ({ row }) => {
			const product = row.original as IProduct;

			return (
				<div className="flex justify-center">
					<img src={product.image} className="h-12" />
				</div>
			);
		},
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
		accessorKey: "stock",
		header: "Antal på lager",
	},
	{
		accessorKey: "category",
		header: "Kategori",
	},
	{
		accessorKey: "edit",
		header: "Rediger",
		cell: ({ row }) => {
			const product = row.original as IProduct;

			return (
				<div className="flex justify-center items-center hover:text-red-400 transition-all">
					<Link to={"form"} state={product}>
						<FaRegEdit size={22} />
					</Link>
				</div>
			);
		},
	},
];