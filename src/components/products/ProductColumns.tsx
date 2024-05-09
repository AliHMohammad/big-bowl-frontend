import { IProduct } from "@/models/IProduct";
import { ColumnDef } from "@tanstack/react-table";
import { FaRegEdit } from "react-icons/fa";

export const ProductColumns: ColumnDef<IProduct>[] = [
	{
		accessorKey: "id",
		header: "Id",
	},
	{
		accessorKey: "image",
		header: "Billede",
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
				<>
					<FaRegEdit />
				</>
			);
		},
	}
]