export type Agenda = {
  days: AgendaDay[]
}

export type AgendaDay = {
  date: string
  events: AgendaEvent[]
}

export type AgendaEvent = {
  time?: string
  fileRelativePath: string
  breadcrumbs: string[]
  urgency: Urgency
  repeat?: AgendaRepeat
}

export type AgendaRepeat = {
  step: number
  unit: string
  initialDate: string
}

export type AgendaEventCreate = {
  date: string
  startTime: string
  endTime: string
  title: string
  urgency: Urgency
}

export type Urgency = 'DEADLINE' | 'SCHEDULED' | 'NONE'
