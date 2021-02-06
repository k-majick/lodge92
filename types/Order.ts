export default interface Order {
  amount: number,
  bookings: any[],
  method: string,
  token: string
}
