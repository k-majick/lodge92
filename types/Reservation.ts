type Nullable<T> = T | null;
import Day from './Day';

export default interface Reservation {
  id: Nullable<number>,
  reservationDays: Nullable<Day[]>,
  totalDays: Nullable<number>,
  cost: Nullable<number>,
}
