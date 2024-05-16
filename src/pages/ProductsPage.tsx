import { IProduct } from "@/models/IProduct";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "@/services/productApi";
import { toast } from "@/components/ui/use-toast";
import DataTable, { PaginationSize } from "@/components/table/DataTable.tsx";
import { ProductColumns } from "@/components/table/table-columns/ProductColumns.tsx";
import { Button } from "@/components/ui/button";
import { IPagination } from "@/models/IPagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function ProductsPage() {
	const [products, setProducts] = useState<IPagination<IProduct> | null>(null);
	const [pagination, setPagination] = useState<PaginationSize>({
		pageIndex: 0, //initial page index
		pageSize: 5, //default page size
	});
	const [sort, setSort] = useState({
		sortBy: "id",
		sortDir: "ASC",
	});
	const [filter, setFilter] = useState("");
	const [search, setSearch] = useState("");

	useEffect(() => {
		const queryParams = new URLSearchParams({
			pageIndex: String(pagination.pageIndex),
			pageSize: String(pagination.pageSize),
			...sort,
		});

		if (filter != "none") queryParams.append("filterBy", filter);
		if (search) queryParams.append("searchBy", search);

		console.log(queryParams);

		getAllProducts(queryParams.toString())
			.then(({ data }) => {
				setProducts(data);
			})
			.catch(() => {
				toast({
					title: "Åh nej! Noget gik galt!",
					description: `Kunne ikke finde produkterne i systemet. Prøv igen på et senere tidspunkt.`,
					variant: "destructive",
				});
			});
	}, [pagination, sort, filter, search]);

	return (
		<>
			<div className="flex flex-col gap-4">
				<div className="flex justify-between">
					<div className="flex gap-4 flex-wrap">
						<Input
							className="w-[200px] bg-gray-100"
							placeholder="Søg efter produkt"
							onChange={(e) => {
								setPagination((prevState) => ({ ...prevState, pageIndex: 0 }));
								setSearch(e.target.value);
							}}
						/>
						<div className="flex gap-1">
							<Select
								onValueChange={(value) => {
									setPagination((prevState) => ({ ...prevState, pageIndex: 0 }));
									setSort((prevState) => ({ ...prevState, sortBy: value }));
								}}
							>
								<SelectTrigger className="w-[140px] bg-gray-100">
									<SelectValue placeholder="Sorter efter" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="id">ID</SelectItem>
									<SelectItem value="name">Navn</SelectItem>
									<SelectItem value="price">Pris</SelectItem>
									<SelectItem value="stock">Antal</SelectItem>
								</SelectContent>
							</Select>

							<Select
								defaultValue="ASC"
								onValueChange={(value) => {
									setPagination((prevState) => ({ ...prevState, pageIndex: 0 }));
									setSort((prevState) => ({ ...prevState, sortDir: value }));
								}}
							>
								<SelectTrigger className="w-[120px] bg-gray-100">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="ASC">Stigende</SelectItem>
									<SelectItem value="DESC">Faldende</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<Select
							onValueChange={(value) => {
								setPagination((prevState) => ({ ...prevState, pageIndex: 0 }));
								setFilter(value);
							}}
						>
							<SelectTrigger className="w-[160px] bg-gray-100">
								<SelectValue placeholder="Filtrer efter" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="none">Ingen</SelectItem>
								<SelectItem value="Snacks">Snacks</SelectItem>
								<SelectItem value="Alkohol">Alkohol</SelectItem>
								<SelectItem value="Drikkevarer">Drikkevarer</SelectItem>
								<SelectItem value="Andet">Andet</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<Link to={"form"}>
						<Button>Tilføj produkt</Button>
					</Link>
				</div>
				{products && (
					<>
						<DataTable columns={ProductColumns} data={products.content} pagination={pagination} />
						<div className="flex justify-evenly">
							<Button
								onClick={() => setPagination((prevState) => ({ ...prevState, pageIndex: prevState.pageIndex - 1 }))}
								disabled={products?.first}
							>
								{"Forrige"}
							</Button>
							{products?.totalPages ? (
								<p className="text-white">
									{" "}
									Side {pagination.pageIndex + 1} / {products?.totalPages}{" "}
								</p>
							) : null}
							<Button
								onClick={() => setPagination((prevState) => ({ ...prevState, pageIndex: prevState.pageIndex + 1 }))}
								disabled={products?.last}
							>
								{"Næste"}
							</Button>
						</div>
					</>
				)}
			</div>
		</>
	);
}
