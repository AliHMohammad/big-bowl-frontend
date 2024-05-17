import { IActivity } from "./IActivity";
import { IProduct } from "./IProduct";
import { IUser } from "./IUser";



export interface IBooking {
    id: number,
    price: number,
    start: string,
    end: string,
    user: IUser,
    activity: IActivity,
    participants: string[],
    products: IBookingProduct[]
}

interface IBookingProduct {
    id: number,
    name: string,
    image: string,
    quantity: number
}