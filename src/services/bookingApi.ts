import { OccupiedTimesResponse } from "@/components/forms/createBookingForm/CreateBookingStep2";
import { IBooking } from "@/models/IBooking";
import { API_URL } from "@/settings.ts";
import axios, { AxiosResponse } from "axios";
import { format } from "date-fns";

async function getAllBookings(): Promise<AxiosResponse<IBooking[], unknown>> {
	return axios.get(`${API_URL}/bookings`);
}

async function getAllBookingsById(id: string): Promise<AxiosResponse<IBooking[], unknown>> {
	return axios.get(`${API_URL}/bookings/users/${id}`);
}

async function updateBookingParticipants(id: number, body: string[]): Promise<AxiosResponse<IBooking, unknown>> {
	return axios.patch(`${API_URL}/bookings/${id}/participants`, body);
}

async function deleteBooking(id: number): Promise<AxiosResponse<IBooking, unknown>> {
	return axios.delete(`${API_URL}/bookings/${id}`);
}

async function getOccupiedBookingTimes(activityId: number, date: Date): Promise<AxiosResponse<OccupiedTimesResponse[], unknown>> {
	const formattedDate = format(date, "MM/dd/yyyy");
	return axios.get(`${API_URL}/bookings/times`, {
		params: {
			activityId,
			date: formattedDate,
		},
	});
}

export { getAllBookings, getAllBookingsById, updateBookingParticipants, deleteBooking, getOccupiedBookingTimes };
