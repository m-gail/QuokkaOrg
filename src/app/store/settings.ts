import { defineStore } from 'pinia'

type SettingsStore = {
  directoryPath: string
  ignoredFolders: string[]
}

export const useSettingsStore = defineStore('settings', {
  state: () => ({ directoryPath: '', ignoredFolders: ['.stversions'] }) as SettingsStore,
  actions: {
    setDirectoryPath(path: string) {
      this.directoryPath = path
    },
    setIgnoredFolders(ignoredFolders: string[]) {
      this.ignoredFolders = ignoredFolders
    },
  },
  persist: true,
})
