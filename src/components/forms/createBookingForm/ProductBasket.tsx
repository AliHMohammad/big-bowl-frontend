import { IProductQuantity } from "@/pages/UserCreateBookingPage";
import React from "react";
import { Button } from "@/components/ui/button.tsx";

type Props = {
	selectedProducts: IProductQuantity[];
	setSelectedProducts: React.Dispatch<React.SetStateAction<IProductQuantity[]>>;
};

export default function ProductBasket({ selectedProducts, setSelectedProducts }: Props) {
	const TOTAL_PRICE = selectedProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);

	const handleClick = (action: "+" | "-", p: IProductQuantity) => {
		const filtered = selectedProducts.filter((product) => product.id != p.id).sort((a, b) => a.id - b.id);

		if (action == "+") {
			setSelectedProducts(() => [...filtered, { ...p, quantity: p.quantity + 1 }].sort((a, b) => a.id - b.id));
		} else if (action == "-") {
			p.quantity == 1
				? setSelectedProducts(() => [...filtered])
				: setSelectedProducts(() => [...filtered, { ...p, quantity: p.quantity - 1 }].sort((a, b) => a.id - b.id));
		}
	};

	return (
		<section className="w-72 h-fit bg-red-300 p-3">
			{selectedProducts.map((p) => {
				return (
					<div key={p.id} className={"flex justify-between items-center px-2"}>
						<p>
							{p.name} - {p.price * p.quantity}kr.
						</p>
						<div className={"flex gap-1 items-center"}>
							<Button type={"button"} variant="outline" size="icon" onClick={() => handleClick("-", p)}>
								-
							</Button>
							{p.quantity}
							<Button disabled={p.quantity === p.stock} type={"button"} variant="outline" size="icon" onClick={() => handleClick("+", p)}>
								+
							</Button>
						</div>
					</div>
				);
			})}
			<p className={"text-right p-2"}>Total: {TOTAL_PRICE}kr.</p>
		</section>
	);
}
