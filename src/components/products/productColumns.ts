import { IProduct } from "@/models/IProduct";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
const columnHelper = createColumnHelper();
export const productColumns: ColumnDef<IProduct>[] = [
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
		header: "Katagori",
	},
];
