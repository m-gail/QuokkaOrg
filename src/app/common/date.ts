export function getDateRange(startDate: Date, numberOfDays: number): [Date, Date] {
  const rangeStart = new Date(startDate)
  rangeStart.setHours(0, 0, 0, 0)
  const rangeEnd = new Date(rangeStart)
  rangeEnd.setDate(rangeEnd.getDate() + (numberOfDays - 1))
  rangeEnd.setHours(23, 59, 59, 999)
  return [rangeStart, rangeEnd]
}

export function getNextDay(date: Date, count: number = 1) {
  const nextDay = new Date(date)
  nextDay.setDate(nextDay.getDate() + count)
  return nextDay
}

export function getPreviousDay(date: Date, count: number = 1) {
  const previousDay = new Date(date)
  previousDay.setDate(previousDay.getDate() - count)
  return previousDay
}

export function getNextMonth(date: Date) {
  const nextDay = new Date(date)
  nextDay.setMonth(nextDay.getMonth() + 1)
  return nextDay
}

export function getPreviousMonth(date: Date) {
  const previousDay = new Date(date)
  previousDay.setMonth(previousDay.getMonth() - 1)
  return previousDay
}

export function getStartOfMonth(date: Date) {
  const page = new Date(date)
  page.setDate(1)
  return page
}

export function isSameDay(d1: Date, d2: Date) {
  return formatIsoDate(d1) === formatIsoDate(d2)
}

const DATE_WITH_WEEKDAY = Intl.DateTimeFormat(undefined, {
  weekday: 'long',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
})

const DATE = Intl.DateTimeFormat(undefined, {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
})

const MONTH_AND_YEAR = Intl.DateTimeFormat(undefined, {
  month: 'long',
  year: 'numeric',
})

export function formatDateWithWeekDay(date: Date) {
  return DATE_WITH_WEEKDAY.format(date)
}

export function formatDate(date: Date) {
  return DATE.format(date)
}

export function formatMonthAndYear(date: Date) {
  return MONTH_AND_YEAR.format(date)
}

export function formatIsoDate(date: Date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0]
}
