import type { File } from "@/components/directoryPicker"
import type { Agenda } from "@/org/types"

export type AgendaCache = {
  knownFiles: File[]
  cachedAgenda: Agenda
}

export type CacheProvider = {
  get(): AgendaCache
  set(cache: AgendaCache): void
  clear(): void
}

