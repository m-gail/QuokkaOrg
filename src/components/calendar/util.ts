import { formatIsoDate } from '@/app/common/date'
import type { CalendarEvent } from './types'

export function isEventOnDay(event: CalendarEvent, day: Date) {
  return formatIsoDate(day) == event.day
}
