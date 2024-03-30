import { Accommodation } from "./Accommodation";
import { AccommodationWithId } from "./AccommodationWithId";
import { User } from "./User";

export interface Reservation {
    startDate: string;
    endDate: string;
    price?: number;
    transactionId?: string;
    accommodation?: AccommodationWithId;
    user?: User;
}