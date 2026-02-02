import { defineStore } from 'pinia'
import type { AgendaCache, ListDirCache } from '../common/agenda/cache/types'
import { filterAgenda, type AgendaFilter } from '@/org/filter/filterAgenda'
import { sortAgenda } from '@/org/sort'
import { DirectoryPicker } from '@/components/directoryPicker'
import { updateAgendaCache } from '../common/agenda/cache/updateAgendaCache'
import { updateListDirCache } from '../common/agenda/cache/updateListDirCache'
import { rescheduleNotifications } from '../common/agenda/notifications/schedule'
import { now } from '../common/date'

type AgendaStore = {
  listDirCache: ListDirCache | null
  agendaCache: AgendaCache
  timestamp: number
  updating: boolean
}

export const useAgendaStore = defineStore('agenda', {
  state: () =>
    ({
      agendaCache: { knownFiles: [], cachedAgenda: { days: [] } },
      listDirCache: null,
      timestamp: 0,
      updating: false
    }) as AgendaStore,
  getters: {
    getAgenda: (state) => {
      return (filters?: AgendaFilter) => {
        return sortAgenda(filterAgenda(state.agendaCache.cachedAgenda, filters))
      }
    },
  },
  actions: {
    async tryTriggerUpdate(directory: string, ignoredFolders: string[], force: boolean = false) {
      if ((!isOutdated(this.timestamp) || directory == '') && !force) {
        return;
      }
      this.updating = true
      this.timestamp = now().getTime()
      const oldListDirCache = this.listDirCache
      const newListDirCache = await updateListDirCache(
        oldListDirCache,
        async () =>
          (
            await DirectoryPicker.listDirectory({
              path: directory,
              ignoredFolders: ignoredFolders,
            })
          ).files,
      )

      const oldCache = this.agendaCache
      const newCache = await updateAgendaCache(
        oldCache,
        newListDirCache.files,
        async (path) => (await DirectoryPicker.readFile(path)).content,
      )

      rescheduleNotifications(newCache.cachedAgenda).then()

      this.agendaCache = newCache
      this.listDirCache = newListDirCache
      this.updating = false
    },
    clearCache() {
      this.agendaCache = { knownFiles: [], cachedAgenda: { days: [] } }
      this.listDirCache = null
      this.timestamp = 0
    }
  },
  persist: true,
})

function isOutdated(timestamp: number) {
  const currentTimestamp = now().getTime()
  return currentTimestamp > timestamp + 60_000
}
