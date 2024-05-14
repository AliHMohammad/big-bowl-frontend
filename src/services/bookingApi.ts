import { IBooking } from "@/models/IBooking";
import { API_URL } from "@/settings.ts";
import axios, { AxiosResponse } from "axios";

async function getAllBookings(): Promise<AxiosResponse<IBooking[], unknown>> {
	return axios.get(`${API_URL}/bookings`);
}

async function getAllBookingsById(id: string): Promise<AxiosResponse<IBooking[], unknown>> {
	return axios.get(`${API_URL}/bookings/users/${id}`);
}

async function updateBookingParticipants(id: number, body: string[]): Promise<AxiosResponse<IBooking, unknown>> {
	return axios.patch(`${API_URL}/bookings/${id}/participants`, body);
}

export { getAllBookings, getAllBookingsById, updateBookingParticipants };
