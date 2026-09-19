import type { Agenda, AgendaEvent } from '../types'
import { rangeFilter } from './generic'

export type AgendaDayFilter = { startDate: Date; endDate: Date }

export type AgendaEventFilter = (event: AgendaEvent) => boolean

export type AgendaFilter = {
  dayFilter: AgendaDayFilter
  eventFilter?: AgendaEventFilter
}

export function filterAgenda(fullAgenda: Agenda, filter: AgendaFilter): Agenda {
  return {
    ...fullAgenda,
    days: fullAgenda.days
      .filter((day) => rangeFilter(filter.dayFilter.startDate, filter.dayFilter.endDate)(day))
      .map((day) => ({
        ...day,
        events: day.events.filter((event) => filter?.eventFilter?.(event) ?? true),
      }))
      .filter((day) => day.events.length > 0),
  }
}
