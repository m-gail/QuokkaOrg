import type { Agenda, AgendaDay, AgendaEvent } from './types'

export function mergeAgendas(fullAgenda: Agenda, addedAgenda: Agenda): Agenda {
  const newDays = addedAgenda.days.filter((day) => !hasDate(fullAgenda, day.date))

  const existingDaysMerged: AgendaDay[] = fullAgenda.days.map((day) => ({
    date: day.date,
    events: [...day.events, ...getEvents(addedAgenda, day.date)],
  }))

  return { days: [...existingDaysMerged, ...newDays] }
}

function getEvents(agenda: Agenda, date: string): AgendaEvent[] {
  const day = getAgendaDay(agenda.days, date)
  if (day === undefined) {
    return []
  }
  return day.events
}

function hasDate(agenda: Agenda, date: string): boolean {
  return getAgendaDay(agenda.days, date) !== undefined
}

function getAgendaDay(days: AgendaDay[], date: string): AgendaDay | undefined {
  return days.filter((day) => day.date === date)[0]
}
