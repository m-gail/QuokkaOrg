export type Agenda = {
  days: AgendaDay[]
}

export type AgendaDay = {
  date: string
  events: AgendaEvent[]
}

export type AgendaEvent = {
  time?: string
  file: string
  breadcrumbs: string[]
}

