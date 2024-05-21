import { IProductBookingRequest } from "@/pages/UserCreateBookingPage";
import React from "react";

type Props = {
	selectedProducts: IProductBookingRequest[];
};

export default function ProductBasket({ selectedProducts }: Props) {
    
	const TOTAL_PRICE = selectedProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);

	return (
		<section className="w-72 h-fit bg-red-300">
			{selectedProducts.map((p) => {
				return (
					<p>
						{p.name} - {p.quantity} - {p.price * p.quantity}kr.
					</p>
				);
			})}
			<p>Total: {TOTAL_PRICE}kr.</p>
		</section>
	);
}
