import { API_URL } from "@/settings.ts";
import axios, { Axios, AxiosResponse } from "axios";
import { UserRequest } from "@/components/layouts/ClerkButtons.tsx";
import { IProduct } from "@/models/IProduct";

async function getAllProducts(): Promise<AxiosResponse<IProduct[], unknown>> {
	return await axios.get(`${API_URL}/products`);
}

async function getAllProductCategories(): Promise<AxiosResponse<string[], unknown>> {
	return await axios.get(`${API_URL}/categories`);
}

export { getAllProducts, getAllProductCategories };
