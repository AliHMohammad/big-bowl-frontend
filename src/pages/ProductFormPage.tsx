import ProductForm from "@/components/forms/ProductForm";
import { useLocation } from "react-router-dom";
import { IProduct } from "@/models/IProduct.ts";

export default function ProductFormPage() {
	const productToEdit = useLocation().state as IProduct | null;
	console.log(productToEdit);

	return (
		<>
			<h2 className={"text-white text-center text-3xl font-bold mb-10"}>{productToEdit ? "Rediger" : "Opret"} Produkt</h2>
			<section className="flex justify-center">
				<ProductForm product={productToEdit} />
			</section>
		</>
	);
}
