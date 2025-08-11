import { DirectoryPicker } from '@/components/directoryPicker'
import { type AgendaFilter, buildAgenda } from '@/org/parser/agenda'
import type { Agenda } from '@/org/parser/types'

export async function loadAgenda(directory: string, filter?: AgendaFilter): Promise<Agenda> {
  const listDirResult = await DirectoryPicker.listDirectory({
    path: directory,
  })

  const files = listDirResult.files
    .filter((file) => file.name.endsWith('.org'))
    .map((file) => async () => {
      console.log('reading ', file)
      const result = await DirectoryPicker.readFile({
        path: file.path,
      })
      return result.content
    })

  return buildAgenda(files, filter)
}
