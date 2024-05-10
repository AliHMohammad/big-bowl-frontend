import { API_URL } from "@/settings.ts";
import axios, {AxiosResponse } from "axios";
import { IProduct } from "@/models/IProduct";
import { productRequest } from "@/components/forms/ProductForm";
import { IPagination } from "@/models/IPagination";

async function getAllProducts(): Promise<AxiosResponse<IPagination<IProduct>, unknown>> {
	return await axios.get(`${API_URL}/products`);
}

async function getAllProductCategories(): Promise<AxiosResponse<string[], unknown>> {
	return await axios.get(`${API_URL}/categories`);
}

async function createProduct(newProduct: productRequest): Promise<AxiosResponse<IProduct, unknown>> {
	return await axios.post(`${API_URL}/products`, newProduct);
}

async function updateProduct(updatedProduct: productRequest): Promise<AxiosResponse<IProduct, unknown>> {
	return await axios.put(`${API_URL}/products/${updatedProduct?.id}`, updatedProduct)
}

export { getAllProducts, getAllProductCategories, createProduct, updateProduct };
