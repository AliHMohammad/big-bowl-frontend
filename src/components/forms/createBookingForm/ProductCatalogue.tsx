import { PaginationSize } from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import { IPagination } from "@/models/IPagination";
import { IProduct } from "@/models/IProduct";
import { IProductQuantity } from "@/pages/UserCreateBookingPage";

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
					<div className="bg-slate-700 flex flex-col justify-center items-center rounded-md overflow-hidden text-white py-2 gap-2" key={p.id}>
						<p className="font-semibold text-center line-clamp-1">{p.name}</p>
						<div className="flex justify-center my-auto items-center">
							<img src={p.image} alt={p.name} className="h-36" />
						</div>
						<div className="text-center">
						{p.stock ? <p className="text-center text-opacity-50 text-xs text-white">{p.stock} på lager</p> : <p className="text-black text-opacity-0">.</p>}
						{p.price} kr.

						</div>
						<Button
							className="w-14"
							disabled={selectedProducts.some((item) => item.id === p.id) || !p.stock}
							type="button"
							onClick={() => handleProductOnClick(p)}
						>
							{p.stock === 0 ? "Ikke på lager" : "Tilføj"}
						</Button>
					</div>
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
