import { DirectoryPicker } from '@/components/directoryPicker'
import { sortAndFilterAgenda, type AgendaFilter } from '@/org/parser/agenda'
import type { Agenda } from '@/org/parser/types'
import { getDefaultCache, updateCache, type AgendaCache } from './cache'

const cacheKey = 'QuokkaOrg.cachedAgenda'

export async function loadAgenda(directory: string, filter?: AgendaFilter): Promise<Agenda> {
  const listDirResult = await DirectoryPicker.listDirectory({
    path: directory,
  })

  const optionalCache = JSON.parse(
    localStorage.getItem(cacheKey) ?? 'null',
  ) as AgendaCache | null
  const cache = optionalCache ?? getDefaultCache()
  const newCache = await updateCache(
    cache,
    listDirResult.files,
    async (path) => (await DirectoryPicker.readFile(path)).content,
  )
  localStorage.setItem(cacheKey, JSON.stringify(newCache))
  return sortAndFilterAgenda(newCache.cachedAgenda, filter)
}
