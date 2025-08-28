import type { AgendaDay } from '../types'

export function rangeFilter(rangeStart: Date, rangeEnd: Date) {
  return (day: AgendaDay) => {
    const date = new Date(Date.parse(day.date))
    return date >= rangeStart && date <= rangeEnd
  }
}
