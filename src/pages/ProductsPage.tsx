import { IProduct } from "@/models/IProduct";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "@/services/productApi";
import { toast } from "@/components/ui/use-toast";
import DataTable from "@/components/core/DataTable";
import { ProductColumns } from "@/components/products/ProductColumns";
import { Button } from "@/components/ui/button";



export default function ProductsPage() {
	const [products, setProducts] = useState<IProduct[] | null>(null);

	console.log(products);

	useEffect(() => {
		getAllProducts()
			.then(({data}) => {
				setProducts(data.content);
			})
			.catch(() => {
				toast({
					title: "Åh nej! Noget gik galt!",
					description: `Kunne ikke finde produkterne i systemet. Prøv igen på et senere tidspunkt.`,
					variant: "destructive",
				});
			});
	}, []);

	return (
		<>
			<Link to={"form"}>
				<Button>Tilføj produkt</Button>
			</Link>
			{products && <DataTable columns={ProductColumns} data={products} />}
		</>
	);
}
