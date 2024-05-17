import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";

export type PaginationSize = {
	pageIndex: number;
	pageSize: number;
};

type props<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	pagination: PaginationSize;
};

export default function DataTable<TData, TValue>({ columns, data, pagination }: props<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
		state: {
			pagination,
		},
	});

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader className="bg-slate-700">
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow className="hover:bg-slate-700" key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead className="font-bold text-white" key={header.id}>
										{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody className="bg-slate-800">
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow className="hover:bg-slate-700" key={row.id} data-state={row.getIsSelected() && "selected"}>
								{row.getVisibleCells().map((cell) => (
									<TableCell className="text-slate-50" key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								Ingen resultater.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
