import type { File } from '@/components/directoryPicker'
import type { ListDirCache } from './types'

export async function updateListDirCache(
  oldListDirCache: ListDirCache | null,
  listDir: () => Promise<File[]>,
): Promise<ListDirCache> {
  const files = await listDir()
  const newCache = { files }
  return newCache
}

export function refreshSingleFile(
  oldListDirCache: ListDirCache | null,
  newEntry: File,
): ListDirCache {
  const oldFiles = oldListDirCache?.files ?? []
  return {
    files: [
      ...oldFiles.filter((oldFile) => oldFile.relativePath !== newEntry.relativePath),
      newEntry,
    ],
  }
}
