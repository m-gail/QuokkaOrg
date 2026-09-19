import {
  dateFromEvent,
  formatIsoDate,
  getNextDay,
  getNextMonth,
  getNextWeek,
  getNextYear,
} from '@/app/common/date'
import type { AgendaFilter } from '../filter/filterAgenda'
import { mergeAgendas } from '../merge'
import type { Agenda, AgendaRepeat } from '../types'

export function expandRepeats(fullAgenda: Agenda, filter: AgendaFilter): Agenda {
  let filteredAgenda = fullAgenda
  for (const day of fullAgenda.days) {
    const date = dateFromEvent(day.date)
    for (const event of day.events) {
      if (
        event.repeat === undefined ||
        date >= filter.dayFilter.endDate ||
        filter.eventFilter?.(event) === false
      ) {
        continue
      }
      let currentTimeStamp = dateFromEvent(day.date, event.time)
      while (currentTimeStamp <= filter.dayFilter.endDate) {
        currentTimeStamp = nextTimeStamp(currentTimeStamp, event.repeat)
        if (
          filter.dayFilter.startDate <= currentTimeStamp &&
          currentTimeStamp <= filter.dayFilter.endDate
        ) {
          filteredAgenda = mergeAgendas(filteredAgenda, {
            days: [{ date: formatIsoDate(currentTimeStamp), events: [event] }],
          })
        }
      }
    }
  }
  return filteredAgenda
}

function nextTimeStamp(currentTimeStamp: Date, { step, unit }: AgendaRepeat): Date {
  switch (unit) {
    case 'd':
      return getNextDay(currentTimeStamp, step)
    case 'w':
      return getNextWeek(currentTimeStamp, step)
    case 'm':
      return getNextMonth(currentTimeStamp, step)
    case 'y':
      return getNextYear(currentTimeStamp, step)
  }
  return currentTimeStamp
}
