import { DirectoryPicker } from '@/components/directoryPicker'
import { defaultCacheProvider } from './cache/cacheProvider'
import { updateCache } from './cache/updateCache'
import { filterAgenda, type AgendaFilter } from '@/org/filter/filterAgenda'
import { sortAgenda } from '@/org/sort'
import type { Agenda } from '@/org/types'

export async function loadAgenda(directory: string, filter?: AgendaFilter): Promise<Agenda> {
  const listDirResult = await DirectoryPicker.listDirectory({
    path: directory,
  })

  const oldCache = defaultCacheProvider.get()
  const newCache = await updateCache(
    oldCache,
    listDirResult.files,
    async (path) => (await DirectoryPicker.readFile(path)).content,
  )
  defaultCacheProvider.set(newCache)
  return sortAgenda(filterAgenda(newCache.cachedAgenda, filter))
}
