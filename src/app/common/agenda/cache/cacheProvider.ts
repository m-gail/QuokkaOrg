import type { AgendaCache, CacheProvider } from "./types";

const CACHE_KEY = 'QuokkaOrg.cachedAgenda'

class LocalStorageCacheProvider implements CacheProvider {
  constructor(private cacheKey: string) { }

  get(): AgendaCache {
    return JSON.parse(localStorage.getItem(this.cacheKey) ?? 'null') ?? getDefaultCache()
  }
  set(cache: AgendaCache): void {
    localStorage.setItem(this.cacheKey, JSON.stringify(cache))
  }
  clear(): void {
    localStorage.removeItem(this.cacheKey)
  }

}

function getDefaultCache(): AgendaCache {
  return { knownFiles: [], cachedAgenda: { days: [] } }
}

export const defaultCacheProvider: CacheProvider = new LocalStorageCacheProvider(CACHE_KEY)
