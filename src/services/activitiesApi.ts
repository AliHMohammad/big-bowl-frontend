import { IActivity } from "@/models/IActivity";
import { IPagination } from "@/models/IPagination";
import { API_URL } from "@/settings.ts";
import axios, { AxiosResponse } from "axios";

async function getAllActivities(queryParams: string): Promise<AxiosResponse<IPagination<IActivity>, unknown>> {
	return axios.get(`${API_URL}/activities?` + queryParams);
}

async function updateStatusOnActivity(id: number, isOpen: boolean): Promise<AxiosResponse<IActivity, unknown>> {
	return axios.patch(`${API_URL}/activities/${id}`, {
		isOpen
	});
}

export { getAllActivities, updateStatusOnActivity};
