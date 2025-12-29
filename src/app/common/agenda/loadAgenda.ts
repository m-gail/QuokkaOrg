import { DirectoryPicker } from '@/components/directoryPicker'
import { defaultAgendaCacheProvider, defaultListDirCacheProvider } from './cache/cacheProvider'
import { updateAgendaCache } from './cache/updateAgendaCache'
import { filterAgenda, type AgendaFilter } from '@/org/filter/filterAgenda'
import { sortAgenda } from '@/org/sort'
import type { Agenda } from '@/org/types'
import { updateListDirCache } from './cache/updateListDirCache'
import { rescheduleNotifications } from './notifications/schedule'

export async function loadAgenda(
  directory: string,
  ignoredFolders: string[],
  filter?: AgendaFilter,
): Promise<Agenda> {
  const oldListDirCache = defaultListDirCacheProvider.get()
  const newListDirCache = await updateListDirCache(
    oldListDirCache,
    async () =>
      (
        await DirectoryPicker.listDirectory({
          path: directory,
          ignoredFolders: ignoredFolders,
        })
      ).files,
    (cache) => defaultListDirCacheProvider.set(cache),
  )

  const oldCache = defaultAgendaCacheProvider.get()
  const newCache = await updateAgendaCache(
    oldCache,
    newListDirCache.files,
    async (path) => (await DirectoryPicker.readFile(path)).content,
  )
  defaultAgendaCacheProvider.set(newCache)
  rescheduleNotifications(newCache.cachedAgenda).then()
  return sortAgenda(filterAgenda(newCache.cachedAgenda, filter))
}
