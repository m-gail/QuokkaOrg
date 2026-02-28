import type { Agenda, AgendaDay, AgendaEvent } from '../types'

export type AgendaDayFilter = (day: AgendaDay) => boolean

export type AgendaEventFilter = (event: AgendaEvent) => boolean

export type AgendaFilter = {
  dayFilter?: AgendaDayFilter
  eventFilter?: AgendaEventFilter
}

export function filterAgenda(fullAgenda: Agenda, filter?: AgendaFilter): Agenda {
  return {
    ...fullAgenda,
    days: fullAgenda.days
      .filter((day) => filter?.dayFilter?.(day) ?? true)
      .map((day) => ({
        ...day,
        events: day.events.filter((event) => filter?.eventFilter?.(event) ?? true),
      }))
      .filter((day) => day.events.length > 0),
  }
}
