type Nullable<T> = T | null;
import Day from './Day';

export default interface Booking {
  id: Nullable<number>,
  bookingDates: Nullable<string[]>,
  bookingDays: Nullable<Day[]>,
  totalDays: Nullable<number>,
  cost: Nullable<number>,
}
