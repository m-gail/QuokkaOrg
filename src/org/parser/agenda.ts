import { parseSingleFile } from "./singleFile"
import type { AgendaDay, Agenda, AgendaEvent } from "./types"

export type OrgFile = () => Promise<string>

export type AgendaFilter = (event: AgendaDay) => boolean

export async function buildAgenda(files: OrgFile[], filter?: AgendaFilter): Promise<Agenda> {
  let fullAgenda: Agenda = { days: [] }

  for (const file of files) {
    const content = await file()
    const currentFileAgenda = await parseSingleFile(content)
    fullAgenda = merge(fullAgenda, currentFileAgenda)
  }

  for (const day of fullAgenda.days) {
    day.events.sort(compareEvents)
  }

  fullAgenda.days.sort(compareDays)
  fullAgenda.days = fullAgenda.days.filter((day) => filter?.(day) ?? true)

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

function merge(fullAgenda: Agenda, addedAgenda: Agenda): Agenda {
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
