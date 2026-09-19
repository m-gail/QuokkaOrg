import {
  dateFromEvent,
  getNextMonth,
  formatIsoDate,
  getNextWeek,
  getNextYear,
  getNextDay,
} from '@/app/common/date'
import type { AgendaFilter } from '../filter/filterAgenda'
import { mergeAgendas } from '../merge'
import type { Agenda } from '../types'
import { sortAgenda } from '../sort'

export function expandRepeats(fullAgenda: Agenda, filter: AgendaFilter): Agenda {
  let filteredAgenda = fullAgenda
  for (const day of fullAgenda.days) {
    const date = dateFromEvent(day.date)
    for (const event of day.events) {
      const repeat = parseRepeat(event.repeat)
      if (
        repeat === undefined ||
        date >= filter.dayFilter.endDate ||
        filter.eventFilter?.(event) === false
      ) {
        continue
      }
      let currentTimeStamp = dateFromEvent(day.date, event.time)
      while (currentTimeStamp <= filter.dayFilter.endDate) {
        currentTimeStamp = nextTimeStamp(currentTimeStamp, repeat)
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

function nextTimeStamp(currentTimeStamp: Date, [step, unit]: [number, string]): Date {
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

function parseRepeat(repeat?: string): [number, string] | undefined {
  if (repeat == undefined) {
    return undefined
  }
  const groups = /.*(?<step>\d+)(?<unit>\w).*/g.exec(repeat)?.groups
  if (groups == null) {
    return undefined
  }
  const step = parseInt(groups.step)
  if (step <= 0 || !['w', 'm', 'y', 'd'].includes(groups.unit)) {
    return undefined
  }
  return [step, groups.unit]
}
