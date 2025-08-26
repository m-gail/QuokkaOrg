import type { File } from '@/components/directoryPicker'
import type { Agenda } from '@/org/types'

export type AgendaCache = {
  knownFiles: File[]
  cachedAgenda: Agenda
}

export type ListDirCache = {
  files: File[]
  timestamp: number
}

export type CacheProvider<T> = {
  get(): T
  set(cache: T): void
  clear(): void
}
