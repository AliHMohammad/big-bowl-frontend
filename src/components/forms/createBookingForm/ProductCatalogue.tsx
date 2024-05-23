import { PaginationSize } from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import { IPagination } from "@/models/IPagination";
import { IProduct } from "@/models/IProduct";
import { IProductBookingRequest } from "@/pages/UserCreateBookingPage";

type Props = {
	products: IPagination<IProduct>;
	pagination: PaginationSize;
	selectedProducts: IProductBookingRequest[];
	setPagination: React.Dispatch<React.SetStateAction<PaginationSize>>;
	setSelectedProducts: React.Dispatch<React.SetStateAction<IProductBookingRequest[]>>;
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
			<section className="w-[34rem] h-[30rem] grid grid-cols-3 grid-rows-2 gap-4">
				{products.content.map((p) => {
					return (
						<div className="bg-orange-300 flex flex-col justify-center rounded-md overflow-hidden" key={p.id}>
							<p className="font-semibold text-center">{p.name}</p>
							<div className="flex justify-center my-auto">
								<img src={p.image} alt={p.name} className="h-36" />
							</div>

							<Button
								onClick={(e) => {
									e.preventDefault();
									handleProductOnClick(p);
								}}
							>
								Tilføj
							</Button>
						</div>
					);
				})}
			</section>
			<div className="flex justify-evenly">
				<Button
					variant={"outline"}
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
					variant={"outline"}
					onClick={() => setPagination((prevState) => ({ ...prevState, pageIndex: prevState.pageIndex + 1 }))}
					disabled={products?.last}
				>
					{"Næste"}
				</Button>
			</div>
		</div>
	);
}
