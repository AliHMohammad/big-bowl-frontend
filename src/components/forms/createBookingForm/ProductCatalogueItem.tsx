import { Button } from "@/components/ui/button";
import { IProduct } from "@/models/IProduct";
import { IProductQuantity } from "@/pages/UserCreateBookingPage";
import React from "react";

type Props = {
	product: IProduct;
	handleClick: (p: IProduct) => void;
	selectedProducts: IProductQuantity[];
};

export default function ProductCatalogueItem({ product, handleClick, selectedProducts }: Props) {
	return (
		<div className="bg-slate-700 flex flex-col justify-center items-center rounded-md overflow-hidden text-white py-2 gap-2" key={product.id}>
			<p className="font-semibold text-center line-clamp-1">{product.name}</p>
			<div className="flex justify-center my-auto items-center">
				<img src={product.image} alt={product.name} className="h-36" />
			</div>
			<div className="text-center">
				{product.stock ? (
					<p className="text-center text-opacity-50 text-xs text-white">{product.stock} på lager</p>
				) : (
					<p className="text-black text-opacity-0">.</p>
				)}
				{product.price.toFixed(2)} kr.
			</div>
			<Button
				className="w-14 hover:bg-slate-500"
				disabled={selectedProducts.some((item) => item.id === product.id) || !product.stock}
				type="button"
				onClick={() => handleClick(product)}
			>
				{product.stock === 0 ? "Ikke på lager" : "Tilføj"}
			</Button>
		</div>
	);
}
