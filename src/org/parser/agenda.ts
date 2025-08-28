import { Parser, Language, Node } from 'web-tree-sitter'
import type { Agenda, AgendaDay } from '../types'

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
    agendaDay?.events.push({
      time: getTime(timestampNode),
      fileRelativePath: relativePath,
      breadcrumbs: getBreadcrumbs(timestampNode),
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

async function createOrgParser(): Promise<Parser> {
  await Parser.init({
    locateFile: () => '/tree-sitter.wasm',
  })
  const parser = new Parser()
  const Org = await Language.load('/tree-sitter-org.wasm')
  parser.setLanguage(Org)
  return parser
}
