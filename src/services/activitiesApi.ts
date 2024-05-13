import { IActivity } from "@/models/IActivity";
import { API_URL } from "@/settings.ts";
import axios, { AxiosResponse } from "axios";

async function getAllActivities(): Promise<AxiosResponse<IActivity, unknown>> {
	return axios.get(`${API_URL}/activities`);
}

export { getAllActivities };
