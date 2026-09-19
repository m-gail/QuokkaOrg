import { Parser, Language, Node } from 'web-tree-sitter'
import type { Agenda, AgendaDay, Urgency } from '../types'

export async function parseSingleFile(relativePath: string, content: string): Promise<Agenda> {
  const parser = await createOrgParser()
  const tree = parser.parse(content)

  if (tree == null) {
    throw new Error()
  }

  const timestampNodes = tree.rootNode.descendantsOfType('timestamp')
  const days = new Map<string, AgendaDay>()
  for (const timestampNode of timestampNodes) {
    if (timestampNode == null) {
      continue
    }
    const date = getDate(timestampNode)
    if (date == null) {
      continue
    }
    if (!days.has(date)) {
      days.set(date, { date, events: [] })
    }
    const agendaDay = days.get(date)
    const repeat = parseRepeat(getRepeat(timestampNode))
    agendaDay?.events.push({
      time: getTime(timestampNode),
      fileRelativePath: relativePath,
      breadcrumbs: getBreadcrumbs(timestampNode),
      urgency: getUrgency(timestampNode),
      repeat:
        repeat != null
          ? {
              step: repeat[0],
              unit: repeat[1],
              initialDate: date,
            }
          : undefined,
    })
  }

  return { days: [...days.values()] }
}

function getDate(timestampNode: Node) {
  return timestampNode.descendantsOfType('date')[0]?.text
}

function getTime(timestampNode: Node) {
  return (
    timestampNode.descendantsOfType('time')[0]?.text ??
    timestampNode.descendantsOfType('duration')[0]?.text
  )
}

function getBreadcrumbs(timestampNode: Node) {
  let current = timestampNode
  const breadcrumbs = []

  while (current.parent !== null) {
    const element = current.parent
    if (element.type === 'section') {
      const title = getTitle(element)
      if (title !== undefined) {
        breadcrumbs.unshift(title)
      }
    }
    current = current.parent
  }
  return breadcrumbs
}

function getTitle(section: Node): string | undefined {
  return section.descendantsOfType('headline')[0]?.descendantsOfType('item')[0]?.text
}

function getUrgency(timestampNode: Node): Urgency {
  let currentSibling = timestampNode.previousSibling
  while (currentSibling !== null) {
    if (currentSibling.type === 'entry_name') {
      if (currentSibling.text === 'DEADLINE' || currentSibling.text === 'SCHEDULED') {
        return currentSibling.text
      }
      return 'NONE'
    }
    currentSibling = currentSibling.previousSibling
  }
  return 'NONE'
}

function getRepeat(timestampNode: Node): string | undefined {
  return timestampNode.descendantsOfType('repeat')[0]?.text
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

async function createOrgParser(): Promise<Parser> {
  await Parser.init({
    locateFile: () => '/tree-sitter.wasm',
  })
  const parser = new Parser()
  const Org = await Language.load('/tree-sitter-org.wasm')
  parser.setLanguage(Org)
  return parser
}
