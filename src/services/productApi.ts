import { API_URL } from "@/settings.ts";
import axios, { AxiosResponse } from "axios";
import { UserRequest } from "@/components/layouts/ClerkButtons.tsx";
import { IProduct } from "@/models/IProduct";

async function getAllProducts(): Promise<AxiosResponse<IProduct[], unknown>> {
	return await axios.get(`${API_URL}/products`);
}

export { getAllProducts };
