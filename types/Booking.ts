type Nullable<T> = T | null;

export default interface Booking {
  id: Nullable<number>,
  bookingDates: Nullable<string[]>,
  totalDays: Nullable<number>,
  cost: Nullable<number>,
}
