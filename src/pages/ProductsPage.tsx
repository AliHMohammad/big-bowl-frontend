import { IProduct } from "@/models/IProduct";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "@/services/productApi";
import { toast } from "@/components/ui/use-toast";
import DataTable, { PaginationSize } from "@/components/core/DataTable";
import { ProductColumns } from "@/components/products/ProductColumns";
import { Button } from "@/components/ui/button";
import { IPagination } from "@/models/IPagination";



export default function ProductsPage() {
	const [products, setProducts] = useState<IPagination<IProduct> | null>(null)
	const [pagination, setPagination] = useState<PaginationSize>({
		pageIndex: 0, //initial page index
		pageSize: 5, //default page size
	});

	

	useEffect(() => {
		const queryParams = new URLSearchParams({
			pageIndex: String(pagination.pageIndex),
			pageSize: String(pagination.pageSize),
		}).toString();

		console.log(queryParams);
		

		getAllProducts(queryParams)
			.then(({data}) => {
				setProducts(data);
			})
			.catch(() => {
				toast({
					title: "Åh nej! Noget gik galt!",
					description: `Kunne ikke finde produkterne i systemet. Prøv igen på et senere tidspunkt.`,
					variant: "destructive",
				});
			});
	}, [pagination]);

	return (
		<>
			<Link to={"form"}>
				<Button>Tilføj produkt</Button>
			</Link>
			{products && <DataTable columns={ProductColumns} data={products.content} pagination={pagination} />}

			<div className="flex justify-evenly">
				<Button
					onClick={() => setPagination((prevState) => ({ ...prevState, pageIndex: prevState.pageIndex - 1 }))}
					disabled={products?.first}
				>
					{"Forrige"}
				</Button>
				<p>Side {pagination.pageIndex + 1} / {products?.totalPages}</p>
				<Button
					onClick={() => setPagination((prevState) => ({ ...prevState, pageIndex: prevState.pageIndex + 1 }))}
					disabled={products?.last}
				>
					{"Næste"}
				</Button>
			</div>
		</>
	);
}
