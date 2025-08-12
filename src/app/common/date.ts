export function getDateRange(startDate: Date, numberOfDays: number): [Date, Date] {
  const rangeStart = new Date(startDate)
  rangeStart.setHours(0, 0, 0, 0)
  const rangeEnd = new Date(rangeStart)
  rangeEnd.setDate(rangeEnd.getDate() + (numberOfDays - 1))
  rangeEnd.setHours(23, 59, 59, 999)
  return [rangeStart, rangeEnd]
}

export function getNextDay(date: Date) {
  const nextDay = new Date(date)
  nextDay.setDate(nextDay.getDate() + 1)
  return nextDay
}

export function getPreviousDay(date: Date) {
  const previousDay = new Date(date)
  previousDay.setDate(previousDay.getDate() - 1)
  return previousDay
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

export function formatIsoDate(date: Date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0]
}
