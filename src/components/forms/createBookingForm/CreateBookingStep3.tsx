import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import ProductCatalogue from "./ProductCatalogue";
import ProductBasket from "./ProductBasket";
import { IProduct } from "@/models/IProduct";
import { getAllProducts } from "@/services/productApi";
import { IPagination } from "@/models/IPagination";
import { PaginationSize } from "@/components/table/DataTable";
import { toast } from "@/components/ui/use-toast";
import { IProductQuantity } from "@/pages/UserCreateBookingPage";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
	setStep: React.Dispatch<React.SetStateAction<number>>;
	selectedProducts: IProductQuantity[];
	setSelectedProducts: React.Dispatch<React.SetStateAction<IProductQuantity[]>>;
};

export default function CreateBookingStep3({ setStep, selectedProducts, setSelectedProducts }: Props) {
	const [products, setProducts] = useState<IPagination<IProduct> | null>(null);
	const [pagination, setPagination] = useState<PaginationSize>({
		pageIndex: 0, //initial page index
		pageSize: 6, //default page size
	});
	const [filter, setFilter] = useState("");


	useEffect(() => {
		const queryParams = new URLSearchParams({
			pageIndex: String(pagination.pageIndex),
			pageSize: String(pagination.pageSize),
		});

		if (filter != "none") queryParams.append("filterBy", filter);

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
	}, [pagination.pageIndex, pagination.pageSize, filter]);

	return (
		<>
			<div>
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
			<div className="flex gap-5">
				{products && (
					<ProductCatalogue
						products={products}
						setPagination={setPagination}
						pagination={pagination}
						setSelectedProducts={setSelectedProducts}
						selectedProducts={selectedProducts}
					/>
				)}

				<ProductBasket selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />
			</div>
			<div className="flex justify-between">
				<Button className="hover:bg-slate-500" onClick={() => setStep((prev) => prev - 1)}>Forrige</Button>
				<Button className="hover:bg-slate-500" onClick={() => setStep((prev) => prev + 1)}>Næste</Button>
			</div>
		</>
	);
}
