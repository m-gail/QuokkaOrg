export function getDateRange(startDate: Date, numberOfDays: number): [Date, Date] {
  const rangeStart = new Date(startDate)
  rangeStart.setHours(0, 0, 0, 0)
  const rangeEnd = new Date(rangeStart)
  rangeEnd.setDate(rangeEnd.getDate() + (numberOfDays - 1))
  rangeEnd.setHours(23, 59, 59, 999)
  return [rangeStart, rangeEnd]
}
