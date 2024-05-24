import { IProductQuantity } from "@/pages/UserCreateBookingPage";
import React from "react";
import { Button } from "@/components/ui/button.tsx";

type Props = {
	selectedProducts: IProductQuantity[];
	setSelectedProducts: React.Dispatch<React.SetStateAction<IProductQuantity[]>>;
};

export default function ProductBasket({ selectedProducts, setSelectedProducts }: Props) {
	const TOTAL_PRICE = (selectedProducts.reduce((acc, product) => acc + product.price * product.quantity, 0)).toFixed(2);

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
		<section className="w-80 h-fit bg-slate-800 p-3 rounded-lg text-white">
			<div className="flex flex-col gap-6 pt-3">
				{selectedProducts.length === 0 && <div className="text-center">Ingen produkter valgt</div>}
				{selectedProducts.map((p) => {
					return (
						<div key={p.id} className={"flex justify-between items-center"}>
							<div className="flex justify-between items-center text-sm w-full pr-3">
								<p className="line-clamp-1 font-semibold">{p.name}</p>
								<p className="text-xs text-opacity-50 text-white">{(p.price * p.quantity).toFixed(2)} kr.</p>
							</div>
							<div className={"flex justify-between gap-1 w-24 "}>
								<Button
									className="size-5 bg-slate-700 hover:bg-red-300"
									type={"button"}
									variant="outline"
									size="icon"
									onClick={() => handleClick("-", p)}
								>
									-
								</Button>
								<div className="text-sm">{p.quantity}</div>
								<Button
									className="size-5 bg-slate-700 hover:bg-green-300"
									disabled={p.quantity === p.stock}
									type={"button"}
									variant="outline"
									size="icon"
									onClick={() => handleClick("+", p)}
								>
									+
								</Button>
							</div>
						</div>
					);
				})}
			</div>
			<div className={"flex justify-between text-right py-2 font-bold border-t border-orange-300 mt-5"}>
				<div>Total: </div>
				<div>{TOTAL_PRICE} kr.</div>
			</div>
		</section>
	);
}
