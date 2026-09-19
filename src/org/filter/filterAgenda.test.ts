import { expect, test } from 'vitest'
import { filterAgenda, type AgendaDayFilter } from './filterAgenda'
import type { Agenda, AgendaEvent } from '../types'
import { dateFromEvent } from '../../app/common/date'

const EVENT_1: AgendaEvent = {
  breadcrumbs: ['Event 1'],
  urgency: 'NONE',
  fileRelativePath: 'Agenda.org',
}

const EVENT_2: AgendaEvent = {
  breadcrumbs: ['Event 1'],
  urgency: 'SCHEDULED',
  fileRelativePath: 'Agenda.org',
}

const EVENT_3: AgendaEvent = {
  breadcrumbs: ['Event 1'],
  urgency: 'DEADLINE',
  fileRelativePath: 'Agenda.org',
}

const DAY_1 = '2025-12-10'

const DAY_2 = '2025-12-11'

const DAY_FILTER: AgendaDayFilter = {
  startDate: dateFromEvent(DAY_1),
  endDate: dateFromEvent(DAY_2),
}

const TEST_AGENDA: Agenda = {
  days: [
    {
      date: DAY_1,
      events: [EVENT_1],
    },
    {
      date: DAY_2,
      events: [EVENT_2, EVENT_3],
    },
  ],
}

test('dayFilter removes full day', () => {
  const filtered = filterAgenda(TEST_AGENDA, {
    dayFilter: { startDate: dateFromEvent(DAY_1), endDate: dateFromEvent(DAY_1) },
  })

  expect(filtered).toEqual({
    days: [
      {
        date: DAY_1,
        events: [EVENT_1],
      },
    ],
  })
})

test('eventFilter removes single event', () => {
  const filtered = filterAgenda(TEST_AGENDA, {
    eventFilter: (event) => event.urgency !== 'DEADLINE',
    dayFilter: DAY_FILTER,
  })

  expect(filtered).toEqual({
    days: [
      {
        date: DAY_1,
        events: [EVENT_1],
      },
      {
        date: DAY_2,
        events: [EVENT_2],
      },
    ],
  })
})

test('eventFilter removes day if no events remain', () => {
  const filtered = filterAgenda(TEST_AGENDA, {
    eventFilter: (event) => event.urgency === 'NONE',
    dayFilter: DAY_FILTER,
  })

  expect(filtered).toEqual({
    days: [
      {
        date: DAY_1,
        events: [EVENT_1],
      },
    ],
  })
})
