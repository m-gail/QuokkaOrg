import type { AgendaEventCreate } from '../types'
import { formatOrgModDate } from './date'

export function serializeEvent(event: AgendaEventCreate): string {
  const dateObj = new Date(event.date)
  const urgencyPrefix = event.urgency === 'NONE' ? '' : `${event.urgency}: `
  return `* ${event.title}\n${urgencyPrefix}${formatOrgModDate(dateObj, event.startTime, event.endTime)}`
}
