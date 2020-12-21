export default interface Day {
  date: string,
  isCurrentMonth: boolean,
  isSelected: boolean,
  isDisabled: boolean,
  bookings: Array<number>
}
