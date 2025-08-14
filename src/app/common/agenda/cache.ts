import type { File, FilePath } from '@/components/directoryPicker'
import { mergeAgendas } from '@/org/parser/agenda'
import { parseSingleFile } from '@/org/parser/singleFile'
import type { Agenda } from '@/org/parser/types'

export type AgendaCache = {
  knownFiles: File[]
  cachedAgenda: Agenda
}

export async function updateCache(
  cache: AgendaCache,
  listDirResult: File[],
  readFile: (file: FilePath) => Promise<string>,
): Promise<AgendaCache> {
  let newCache = cache

  for (const file of cache.knownFiles) {
    if (isRemoved(file, listDirResult)) {
      newCache = evict(file, cache)
    }
  }

  for (const file of listDirResult) {
    if (isOutdated(file, newCache)) {
      newCache = evict(file, newCache)
      newCache = await addFileToCache(file, newCache, readFile)
    }
  }

  return newCache
}

function isRemoved(file: File, listDirResult: File[]): boolean {
  const listedFile = listDirResult.filter(
    (listedFile) => listedFile.relativePath === file.relativePath,
  )
  return listedFile.length === 0
}

function isOutdated(file: File, cache: AgendaCache): boolean {
  const cachedFile = cache.knownFiles.filter(
    (knownFile) => knownFile.relativePath === file.relativePath,
  )
  if (cachedFile.length === 0) {
    return true
  }
  return file.lastModified > cachedFile[0].lastModified
}

function evict(file: File, cache: AgendaCache): AgendaCache {
  const knownFiles = cache.knownFiles.filter(
    (knownFile) => knownFile.relativePath !== file.relativePath,
  )

  const agenda: Agenda = {
    days: cache.cachedAgenda.days
      .map((day) => ({
        ...day,
        events: day.events.filter((event) => event.fileRelativePath !== file.relativePath),
      }))
      .filter((day) => day.events.length > 0),
  }

  return { cachedAgenda: agenda, knownFiles }
}

function evictRemovedFiles(): AgendaCache { }

async function addFileToCache(
  file: File,
  cache: AgendaCache,
  readFile: (file: FilePath) => Promise<string>,
): Promise<AgendaCache> {
  const fileContent = await readFile({ path: file.absolutePath })
  const parsedAgenda = await parseSingleFile(file.relativePath, fileContent)

  return {
    knownFiles: [...cache.knownFiles, file],
    cachedAgenda: mergeAgendas(cache.cachedAgenda, parsedAgenda),
  }
}

export function getDefaultCache(): AgendaCache {
  return { knownFiles: [], cachedAgenda: { days: [] } }
}
