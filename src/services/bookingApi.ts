import { IBooking } from "@/models/IBooking";
import { API_URL } from "@/settings.ts";
import axios, { AxiosResponse } from "axios";



async function getAllBookings(): Promise<AxiosResponse<IBooking[], unknown>> {
    return axios.get(`${API_URL}/bookings`);
}



export {getAllBookings}