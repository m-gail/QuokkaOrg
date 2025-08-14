import type { Agenda, AgendaDay, AgendaEvent } from './types'

export function sortAgenda(fullAgenda: Agenda): Agenda {
  for (const day of fullAgenda.days) {
    day.events.sort(compareEvents)
  }

  fullAgenda.days.sort(compareDays)
  return fullAgenda
}

function compareDays(d1: AgendaDay, d2: AgendaDay): number {
  return d1.date.localeCompare(d2.date)
}

function compareEvents(e1: AgendaEvent, e2: AgendaEvent): number {
  const time1 = e1.time ?? ''
  const time2 = e2.time ?? ''

  return time1.localeCompare(time2)
}
