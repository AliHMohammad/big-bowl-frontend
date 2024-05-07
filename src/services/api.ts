import { API_URL } from "@/settings.ts";
import axios, { AxiosResponse } from "axios";
import { UserRequest } from "@/components/layouts/ClerkButtons.tsx";


async function createUserInDB(request: UserRequest): Promise<AxiosResponse> {
	return await axios.post(`${API_URL}/users`, request);
}



export {
	createUserInDB
}