import { expect, test, describe } from 'vitest'
import { parseSingleFile } from './agenda'
import type { Agenda } from '../types'

agendaTest(
  'Agenda with multiple entries finds all events',
  'Agenda.org',
  `
* Uni
** Algorithms and Datastructures Test
<2025-08-12 Wed 18:00>
** Algorithms and Datastructures Test
<2025-08-11 Wed 18:00>
* Work
** Sprint Review
<2025-08-11 Wed 15:00>
`,
  {
    days: [
      {
        date: '2025-08-12',
        events: [
          {
            breadcrumbs: ['Uni', 'Algorithms and Datastructures Test'],
            time: '18:00',
            fileRelativePath: 'Agenda.org',
            urgency: 'NONE',
          },
        ],
      },
      {
        date: '2025-08-11',
        events: [
          {
            breadcrumbs: ['Uni', 'Algorithms and Datastructures Test'],
            time: '18:00',
            fileRelativePath: 'Agenda.org',
            urgency: 'NONE',
          },
          {
            breadcrumbs: ['Work', 'Sprint Review'],
            time: '15:00',
            fileRelativePath: 'Agenda.org',
            urgency: 'NONE',
          },
        ],
      },
    ],
  },
)

describe('Single event with urgency is parsed', () => {
  ; (['DEADLINE', 'SCHEDULED'] as const).forEach((urgency) =>
    agendaTest(
      urgency,
      'Agenda.org',
      `
* Event with Urgency
${urgency}: <2025-08-12 Wed>
`,
      {
        days: [
          {
            date: '2025-08-12',
            events: [
              {
                breadcrumbs: ['Event with Urgency'],
                fileRelativePath: 'Agenda.org',
                urgency,
              },
            ],
          },
        ],
      },
    ),
  )
})

function agendaTest(name: string, relativePath: string, content: string, expectedAgenda: Agenda) {
  test(name, async () => {
    const agenda = await parseSingleFile('Agenda.org', content)
    expect(agenda).toEqual(expectedAgenda)
  })
}
