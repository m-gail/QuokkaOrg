export function getDateRange(startDate: Date, numberOfDays: number): [Date, Date] {
  const rangeStart = new Date(startDate)
  rangeStart.setHours(0, 0, 0, 0)
  const rangeEnd = new Date(rangeStart)
  rangeEnd.setDate(rangeEnd.getDate() + (numberOfDays - 1))
  rangeEnd.setHours(23, 59, 59, 999)
  return [rangeStart, rangeEnd]
}

const weekdayFormatter = Intl.DateTimeFormat(undefined, {
  weekday: 'long',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
})

const formatter = Intl.DateTimeFormat(undefined, {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
})

export function formatDateWithWeekDay(date: Date) {
  return weekdayFormatter.format(date)
}

export function formatDate(date: Date) {
  return formatter.format(date)
}
