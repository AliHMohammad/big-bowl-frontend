import { API_URL } from "@/settings.ts";
import axios, { Axios, AxiosResponse } from "axios";
import { UserRequest } from "@/components/layouts/ClerkButtons.tsx";
import { IProduct } from "@/models/IProduct";
import { productRequest } from "@/pages/CreateProductPage";

async function getAllProducts(): Promise<AxiosResponse<IProduct[], unknown>> {
	return await axios.get(`${API_URL}/products`);
}

async function getAllProductCategories(): Promise<AxiosResponse<string[], unknown>> {
	return await axios.get(`${API_URL}/categories`);
}

async function createProduct(newProduct: productRequest): Promise<AxiosResponse<IProduct, unknown>> {
	return await axios.post(`${API_URL}/products`, newProduct);
}

// async function updateProduct() {

// }

export { getAllProducts, getAllProductCategories, createProduct };
