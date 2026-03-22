import { describe, expect, test } from 'vitest'
import { serializeEvent } from './event'
import type { AgendaEventCreate } from '../types'

const tests: [string, AgendaEventCreate, string][] = [
  [
    'serializes with only date',
    {
      date: '2025-01-01',
      startTime: '',
      endTime: '',
      title: 'Some title',
      urgency: 'NONE',
    },
    '* Some title\n<Wed 2025-01-01>',
  ],
  [
    'serializes with date and startTime',
    {
      date: '2025-01-02',
      startTime: '16:00',
      endTime: '',
      title: 'Some title',
      urgency: 'NONE',
    },
    '* Some title\n<Thu 2025-01-02 16:00>',
  ],
  [
    'serializes with date, startTime and endTime',
    {
      date: '2025-01-03',
      startTime: '16:00',
      endTime: '17:00',
      title: 'Some title',
      urgency: 'NONE',
    },
    '* Some title\n<Fri 2025-01-03 16:00-17:00>',
  ],
  [
    'serializes with DEADLINE',
    {
      date: '2025-01-01',
      startTime: '',
      endTime: '',
      title: 'Some title',
      urgency: 'DEADLINE',
    },
    '* Some title\nDEADLINE: <Wed 2025-01-01>',
  ],
  [
    'serializes with SCHEDULED',
    {
      date: '2025-01-01',
      startTime: '',
      endTime: '',
      title: 'Some title',
      urgency: 'SCHEDULED',
    },
    '* Some title\nSCHEDULED: <Wed 2025-01-01>',
  ],
]

tests.forEach(([name, agendaCreate, expectedResult]) => {
  test(name, async () => {
    const content = serializeEvent(agendaCreate)
    expect(content).toEqual(expectedResult)
  })
})
