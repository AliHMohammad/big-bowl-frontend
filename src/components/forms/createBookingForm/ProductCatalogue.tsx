import { PaginationSize } from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import { IPagination } from "@/models/IPagination";
import { IProduct } from "@/models/IProduct";
import { IProductQuantity } from "@/pages/UserCreateBookingPage";
import ProductCatalogueItem from "./ProductCatalogueItem";

type Props = {
	products: IPagination<IProduct>;
	pagination: PaginationSize;
	selectedProducts: IProductQuantity[];
	setPagination: React.Dispatch<React.SetStateAction<PaginationSize>>;
	setSelectedProducts: React.Dispatch<React.SetStateAction<IProductQuantity[]>>;
};

export default function ProductCatalogue({ products, pagination, setPagination, selectedProducts, setSelectedProducts }: Props) {
	const handleProductOnClick = (p: IProduct) => {
		//TODO: Nok i stock?
		console.log(p);

		const productInBasket = selectedProducts.find((product) => product.id === p.id);

		if (productInBasket) {
			const filtered = selectedProducts.filter((product) => product.id != productInBasket.id);
			setSelectedProducts(() => [...filtered, { ...productInBasket, quantity: productInBasket.quantity + 1 }].sort((a, b) => a.id - b.id));
		} else {
			setSelectedProducts((prev) => [...prev, { ...p, quantity: 1 }].sort((a, b) => a.id - b.id));
		}
	};

	return (
		<div>
			<section className="w-[34rem] h-[38rem] grid grid-cols-3 grid-rows-2 gap-4 mb-5">
				{products.content.map((p) => (
					<ProductCatalogueItem key={p.id} product={p} handleClick={handleProductOnClick} selectedProducts={selectedProducts} />
				))}
			</section>
			<div className="flex justify-evenly">
				<Button
					type={"button"}
					variant={"outline"}
					onClick={() => setPagination((prevState) => ({ ...prevState, pageIndex: prevState.pageIndex - 1 }))}
					disabled={products?.first}
				>
					{"<"}
				</Button>
				{products?.totalPages ? (
					<p className="text-white flex items-center">
						{" "}
						Side {pagination.pageIndex + 1} / {products?.totalPages}{" "}
					</p>
				) : null}
				<Button
					type={"button"}
					variant={"outline"}
					onClick={() => setPagination((prevState) => ({ ...prevState, pageIndex: prevState.pageIndex + 1 }))}
					disabled={products?.last}
				>
					{">"}
				</Button>
			</div>
		</div>
	);
}
