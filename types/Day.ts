export default interface Day {
  date: string,
  isCurrentMonth: boolean,
  isSelected: boolean,
  isDisabled: boolean,
  isBlocked: boolean,
  bookings: Array<number>
}
