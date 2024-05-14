import { IActivity } from "./IActivity";
import { IProduct } from "./IProduct";
import { IUser } from "./IUser";



export interface IBooking {
    id: number,
    price: number,
    startTime: Date,
    endTime: Date,
    user: IUser,
    activity: IActivity,
    participants: string[],
    products: IProduct[]
}