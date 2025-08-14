import type { Agenda, AgendaDay } from "../types"

export type AgendaFilter = (event: AgendaDay) => boolean

export function filterAgenda(fullAgenda: Agenda, filter?: AgendaFilter): Agenda {
  return { ...fullAgenda, days: fullAgenda.days.filter((day) => filter?.(day) ?? true) }
}
