import type { AgendaCache, CacheProvider, ListDirCache } from './types'

const AGENDA_CACHE_KEY = 'QuokkaOrg.cachedAgenda'
const LISTDIR_CACHE_KEY = 'QuokkaOrg.cachedListDir'

class StorageCacheProvider<T> implements CacheProvider<T> {
  constructor(
    private storage: Storage,
    private cacheKey: string,
    private getDefaultCache: () => T,
  ) { }

  get(): T {
    return JSON.parse(this.storage.getItem(this.cacheKey) ?? 'null') ?? this.getDefaultCache()
  }
  set(cache: T): void {
    this.storage.setItem(this.cacheKey, JSON.stringify(cache))
  }
  clear(): void {
    this.storage.removeItem(this.cacheKey)
  }
}

function getDefaultAgendaCache(): AgendaCache {
  return { knownFiles: [], cachedAgenda: { days: [] } }
}

function getDefaultListDirCache(): ListDirCache | null {
  return null
}

export const defaultAgendaCacheProvider: CacheProvider<AgendaCache> = new StorageCacheProvider(
  localStorage,
  AGENDA_CACHE_KEY,
  getDefaultAgendaCache,
)

export const defaultListDirCacheProvider: CacheProvider<ListDirCache | null> =
  new StorageCacheProvider(sessionStorage, LISTDIR_CACHE_KEY, getDefaultListDirCache)
