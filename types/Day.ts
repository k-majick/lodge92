export default interface Day {
  date: string,
  isCurrentMonth: boolean,
  isSelected: boolean,
  bookings: Array<number>
}
