import type { File } from '@/components/directoryPicker'
import type { ListDirCache } from './types'
import { now } from '../../date'

export async function updateListDirCache(
  oldListDirCache: ListDirCache | null,
  listDir: () => Promise<File[]>,
  setCache: (cache: ListDirCache | null) => void,
): Promise<ListDirCache> {
  if (oldListDirCache != null) {
    if (isOutdated(oldListDirCache)) {
      const timestamp = getCurrentTimestamp()
      setCache({ files: oldListDirCache.files, timestamp })
      setTimeout(async () => await updateCache(listDir, setCache))
    }
    return oldListDirCache
  }
  return await updateCache(listDir, setCache)
}

async function updateCache(
  listDir: () => Promise<File[]>,
  setCache: (cache: ListDirCache | null) => void,
): Promise<ListDirCache> {
  const timestamp = getCurrentTimestamp()
  const files = await listDir()
  const newCache = { files, timestamp }
  setCache(newCache)
  return newCache
}

function getCurrentTimestamp(): number {
  return now().getTime()
}

function isOutdated(cache: ListDirCache) {
  const currentTimestamp = getCurrentTimestamp()
  return currentTimestamp > cache.timestamp + 60_000
}
